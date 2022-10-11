import { Message } from "node-telegram-bot-api";
import { Role } from "../../../sequelize/db";
import { checkRole } from "../../middleware/authMiddleware";
import { adminRoles } from "../../middleware/roles";
import { bot } from "../bot";
import { roleErrorMessage } from "../messages";


export async function addUserRole(msg:Message){
    const chatId = msg.chat.id;
    const message = msg.text;
    const role = message.split(' ')[1];
    const username = message.split(' ')[2];

    if(adminRoles.includes(await checkRole(msg))){
       const request = await Role.create({
        telegramId:username, 
        role:role,
        aproved:true
    })
        bot.sendMessage(chatId, `Пользователь ${username} получил роль ${role}`)
    }else{
        bot.sendMessage(chatId, roleErrorMessage)
    }

}

export async function deleteUser(msg:Message){
    const chatId = msg.chat.id;
    const message = msg.text;
    const username = message.split(' ')[1];

    if(adminRoles.includes(await checkRole(msg))){
        const request = await Role.destroy({
            where:{
                telegramId:username
            }
        })
        bot.sendMessage(chatId, `Пользователь ${username} удален`)
    }else{
        bot.sendMessage(chatId, roleErrorMessage)
    }

}


export async function showUsers(msg:Message){
    const chatId = msg.chat.id;

    if(adminRoles.includes(await checkRole(msg))){
        const request = await Role.findAll();
        let users = request.map((user:any) => {
            return `Пользователь: ${user.telegramId} Роль: ${user.role} Активирована: ${user.aproved}`
        })
        bot.sendMessage(chatId, users.join('\n'))
    }else{
        bot.sendMessage(chatId, roleErrorMessage)
    }

}


export async function chnageUserRole(msg:Message){
    const chatId = msg.chat.id;
    const message = msg.text;
    const role = message.split(' ')[1];
    const username = message.split(' ')[2];
    console.log(role, username);

    if(adminRoles.includes(await checkRole(msg))){
        const request = await Role.update({role:role}, {
            where:{
                telegramId:username
            }
        })
        bot.sendMessage(chatId, `Роль пользователя ${username} изменена на ${role}`)
    }else{
        bot.sendMessage(chatId, roleErrorMessage)
    }

}
