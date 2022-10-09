import { findDuplicateQueuePosition, findQueuePosition, isQueueExist } from './supportingFunctions';
import { Queue, QueuePosition } from './../../sequelize/db';
import { Message } from "node-telegram-bot-api";
import TelegramBot from "node-telegram-bot-api";
import * as dotenv from 'dotenv';
import { createQueueCommand, showQueuesCommand, takeQueueCommand, showQueueCommand, startMessage, startCommand, helpCommand, deleteQueueCommand, testCommand } from './messages';
dotenv.config()



export function startBot(){
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

    bot.onText(testCommand, (msg: Message) => {
        bot.sendMessage(msg.chat.id, "test");
    })

    bot.onText(startCommand || helpCommand, (msg:Message) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId,startMessage)
    });


    bot.onText(createQueueCommand, async (msg:Message) => {
        const chatId = msg.chat.id;
        let message = msg.text;
        const queueName = message.split(' ')[1];

        if(await isQueueExist(queueName)){
            console.log('queue exist');
            bot.sendMessage(chatId, `Очередь с именем ${queueName} уже существует`);

        }else{
            console.log('queue not exist');
            const request:any = await Queue.create({name:queueName});  
            bot.sendMessage(chatId, `Очередь ${request.name} создана с id: ${request.id}`)
        }
       
    });

    bot.onText(showQueuesCommand, async (msg:Message) => {
        const chatId = msg.chat.id;
        const request:any = await Queue.findAll();
        let queues = request.map((item:any) => item.name)
        console.log('queues-> ',queues);

        let queueStudentCounts = await Promise.all(queues.map(async (queue:string) => {
            const queuePositionRequest:any = await QueuePosition.findAll({
                where:{
                    queueName:queue
                }
            })
            return queuePositionRequest.length;
        }))

        let queuesToSend =  queues.map((queue:string, index:number) => {
            return `${queue}: ${queueStudentCounts[index]}🥴\n`
        })
        let mesageTosend = `Список очередей:\n${queuesToSend.join('')}`
        bot.sendMessage(chatId, mesageTosend)
    });


    bot.onText(takeQueueCommand, async (msg:Message) => {
        const chatId = msg.chat.id;
        let message = msg.text;
        const queueName = message.split(' ')[1];

        if(await isQueueExist(queueName)){

            const queuePositionRequest:any = await findQueuePosition(queueName);
            if(queuePositionRequest){
                if(await findDuplicateQueuePosition(queueName, msg.from.first_name)){
                    bot.sendMessage(chatId, `Вы уже находитесь в очереди ${queueName}`)
                }else{
                    const position = queuePositionRequest.dataValues.maxPosition + 1;
                    const request:any = await QueuePosition.create({queueName:queueName, position:position, studentName:msg.from.first_name});
                    bot.sendMessage(chatId, `Вы встали в очередь ${queueName} на позицию ${position}`)
                }
            }else{
                const request:any = await QueuePosition.create({queueName:queueName, position:1, studentName:msg.from.first_name});
                bot.sendMessage(chatId, `Вы встали в очередь ${queueName} на позицию 1`)
            }

        }else{
            bot.sendMessage(chatId, `Очередь ${queueName} не найдена`)
        }  
    });


    bot.onText(deleteQueueCommand, async (msg:Message) => {
        const chatId = msg.chat.id;
        let message = msg.text;
        const queueName = message.split(' ')[1];

        if(await isQueueExist(queueName)){

            const requestQueuePosition:any = await QueuePosition.destroy({
                where:{
                    queueName:queueName
                }
            })

            const requestQueue:any = await Queue.destroy({
                where:{
                    name:queueName
                }
            })
            bot.sendMessage(chatId, `Очередь ${queueName} удалена`)
        }else{
            bot.sendMessage(chatId, `Очередь ${queueName} не найдена`)
        }
    });




    bot.onText(showQueueCommand, async (msg:Message) => {
        const chatId = msg.chat.id;
        let message = msg.text;
        const queueName = message.split(' ')[1];

        const queueRequest = await Queue.findOne({ //проверка на наличие очереди
            where:{
                name:queueName
            }
        });

        if(queueRequest){

            const queuePositionRequest:any = await QueuePosition.findAll({ // проверка на
                where:{
                    queueName:queueName
                },
                order: [
                    ['position', 'ASC']
                ]
            })
            if(queuePositionRequest){
                let queuePositions = queuePositionRequest.map((item:any) => `${item.position} ${item.studentName}`)
                let mesageTosend = `Очередь ${queueName}:\n${queuePositions.join('\n')}`
                bot.sendMessage(chatId, mesageTosend)
            }else{
                bot.sendMessage(chatId, `Очередь ${queueName} пуста`)
            }

        }else{
            bot.sendMessage(chatId, `Очередь ${queueName} не найдена`)
        }  
    });

}

