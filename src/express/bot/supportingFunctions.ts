import { Sequelize } from 'sequelize';
import { Queue, QueuePosition } from './../../sequelize/db';


export const isQueueExist = async (queueName:string) => {
    const queueRequest = await Queue.findOne({ //проверка на наличие очереди
        where:{
            name:queueName
        }
    });
    console.log('find queue-> ',queueRequest? true : false);
    return queueRequest? true : false;
}


export const findQueuePosition = async (queueName:string) => {
    const queuePositionRequest:any = await QueuePosition.findOne({ // проверка на
        where:{
            queueName:queueName
        },
        attributes: [[Sequelize.fn('max', Sequelize.col('position')), 'maxPosition']]
    })
    return queuePositionRequest;
}


export const findDuplicateQueuePosition = async (queueName:string, studentName:string) => {
    const queuePositionRequest:any = await QueuePosition.findOne({ // проверка на дубликат позиции
        where:{
            queueName:queueName,
            studentName:studentName
        }
    })
    console.log('find duplicate queue-> ',queuePositionRequest? true : false);
    return queuePositionRequest? true : false;
}


