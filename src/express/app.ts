import express, { Express } from "express";
import { startBot } from "./bot/bot";
import * as dotenv from 'dotenv';
dotenv.config()


const app:Express = express();
app.use(express.static('static'))
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`API start page`);}
);

startBot();


export default app;
