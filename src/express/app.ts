import express, { Express } from "express";
import { startBot } from "./bot/bot";



const app:Express = express();
app.use(express.static('static'))
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');}
);

startBot();


module.exports = app;
