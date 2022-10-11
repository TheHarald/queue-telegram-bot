import { Message } from "node-telegram-bot-api";
import { Queue, QueuePosition } from "../../../sequelize/db";
import { checkRole } from "../../middleware/authMiddleware";
import { creatorRoles, userRoles } from "../../middleware/roles";
import { bot } from "../bot";
import { roleErrorMessage } from "../messages";
import { isQueueExist } from "../supportingFunctions";



export async function createQueue(msg:Message){
    const chatId = msg.chat.id;
    let message = msg.text;
    const queueName = message.split(' ')[1];

    if(creatorRoles.includes(await checkRole(msg))){
        if(await isQueueExist(queueName)){
            console.log('queue exist');
            bot.sendMessage(chatId, `Очередь с именем ${queueName} уже существует`);
    
        }else{
            console.log('queue not exist');
            const request:any = await Queue.create({name:queueName});  
            bot.sendMessage(chatId, `Очередь ${request.name} создана с id: ${request.id}`)
        }
    }else{
        bot.sendMessage(chatId, roleErrorMessage)
    }
}


export async function deleteQueue(msg:Message){
    const chatId = msg.chat.id;
    const message = msg.text;
    const queueName = message.split(' ')[1];

    if(creatorRoles.includes(await checkRole(msg))){
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
    }else{
        bot.sendMessage(chatId, roleErrorMessage)
    }

    
}


export async function showQueues(msg:Message) {
    const chatId = msg.chat.id;
    const request:any = await Queue.findAll();
    let queues = request.map((item:any) => item.name)
    console.log('queues-> ',queues);
    if(userRoles.includes(await checkRole(msg))){
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
        let mesageToSend = `Список очередей:\n${queuesToSend.join('')}`
        bot.sendMessage(chatId, mesageToSend)
    }else{
        bot.sendMessage(chatId, roleErrorMessage)
    }

    
}



export async function showQueue(msg:Message){
    const chatId = msg.chat.id;
    let message = msg.text;
    const queueName = message.split(' ')[1];


    if(userRoles.includes(await checkRole(msg))){
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
    }else{
        bot.sendMessage(chatId, roleErrorMessage)
    }

    
}