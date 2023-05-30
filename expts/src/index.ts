import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validEnv';
import fs from 'fs'
import path from 'path'
const morganBody = require("morgan-body")
var morgan = require('morgan')

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;
const LOGS_FOLDER = process.env.LOGS_FOLDER || "../logs";

const log = fs.createWriteStream(
    path.join(__dirname, LOGS_FOLDER, "express.log"), { flags: "a"}
)

app.use(morgan('combined', { stream: log }))

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Requisição ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
