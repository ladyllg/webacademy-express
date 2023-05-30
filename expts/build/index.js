"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const validEnv_1 = __importDefault(require("./utils/validEnv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const morganBody = require("morgan-body");
var morgan = require('morgan');
dotenv_1.default.config();
(0, validEnv_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
const LOGS_FOLDER = process.env.LOGS_FOLDER || "../logs";
const log = fs_1.default.createWriteStream(path_1.default.join(__dirname, LOGS_FOLDER, "express.log"), { flags: "a" });
app.use(morgan('combined', { stream: log }));
app.use((req, res, next) => {
    console.log(`Requisição ${req.method} ${req.url}`);
    next();
});
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
