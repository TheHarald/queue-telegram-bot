import { Message } from "node-telegram-bot-api";
import TelegramBot from "node-telegram-bot-api";
import * as dotenv from 'dotenv';
import { createQueueCommand, showQueuesCommand, 
    takeQueueCommand, showQueueCommand, 
    startMessage, startCommand, helpCommand, 
    deleteQueueCommand, testCommand, 
    addUserRoleCommand, deleteUserCommand, 
    showUsersCommand, changeUserRoleCommand 
} from './messages';
import { checkRole } from '../middleware/authMiddleware';
import { createQueue, deleteQueue, showQueue, showQueues } from './commands/queue';
import { takeQueue } from './commands/queuePosition';
import { addUserRole, chnageUserRole, deleteUser, showUsers } from "./commands/rolesHandler";
dotenv.config()


export const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});

export function startBot(){

    bot.onText(testCommand, async (msg: Message) => {
        if(await checkRole(msg) === 'admin'){
            bot.sendMessage(msg.chat.id, 'you are admin');
        }else{
            bot.sendMessage(msg.chat.id, 'you are not admin');
        }
        
    })

    bot.onText(startCommand, (msg:Message) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId,startMessage)
    });
    bot.onText(helpCommand, (msg:Message) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId,startMessage)
    });

    bot.onText(createQueueCommand, createQueue);
    bot.onText(showQueuesCommand, showQueues);
    bot.onText(takeQueueCommand,takeQueue);
    bot.onText(deleteQueueCommand, deleteQueue);
    bot.onText(showQueueCommand, showQueue);

    bot.onText(addUserRoleCommand, addUserRole)
    bot.onText(deleteUserCommand, deleteUser)
    bot.onText(showUsersCommand, showUsers)
    bot.onText(changeUserRoleCommand, chnageUserRole)
    

}

