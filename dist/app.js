"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typedi_1 = require("typedi"); //import { UserService } from './application/services/UserService';
const UserController_1 = require("./adapters/controllers/UserController");
const bodyParser = require('body-parser');
const cors = require('cors');
// parse application/x-www-form-urlencoded
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
const userController = typedi_1.Container.get(UserController_1.UserController);
app.get('/logs', (req, res) => userController.getLogs(req, res));
app.post('/logs', (req, res) => userController.sendMessage(req, res));
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
//# sourceMappingURL=app.js.map