import { Message } from "node-telegram-bot-api";
import { Role } from "../../sequelize/db";


export async function checkRole(msg:Message){
    console.log(msg.from.username);
    const username = msg.from.username;

    const role:any = await Role.findOne({
        where:{
            telegramId:username
        }
    })

    return role? role.dataValues.role : null;
}