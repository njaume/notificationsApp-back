import "reflect-metadata"
import express, { Express } from 'express';
import { Container } from 'typedi';//import { UserService } from './application/services/UserService';
import { UserController } from "./adapters/controllers/UserController";
const bodyParser = require('body-parser')
const cors = require('cors')

// parse application/x-www-form-urlencoded
const app: Express = express();
app.use(express.json());
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const userController = Container.get<UserController>(UserController);
app.get('/logs',(req, res) => userController.getLogs(req, res));
app.post('/logs',(req, res) => userController.sendMessage(req, res));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
