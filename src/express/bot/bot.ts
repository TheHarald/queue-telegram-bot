const {Telegraf} = require("telegraf");
require('dotenv').config();


export function startBot(){
    const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
    bot.command('some', (ctx) => {
        ctx.reply('Hello World!');
    });
    bot.launch();
}