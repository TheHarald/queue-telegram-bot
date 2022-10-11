import { Message } from "node-telegram-bot-api";
import { QueuePosition } from "../../../sequelize/db";
import { bot } from "../bot";
import { findDuplicateQueuePosition, findQueuePosition, isQueueExist } from "../supportingFunctions"


export async function takeQueue (msg:Message){
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
}
    
