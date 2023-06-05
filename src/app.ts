import "reflect-metadata"
import express, { Express } from 'express';
import { UserController } from './adapters/controllers/UserController';
const { Container } = require('typedi');
//import { UserService } from './application/services/UserService';
//import { UserRepository } from './domain/repositories/UserRepository';
//import { UserPersistenceRepository } from './infra/persistence/UserPersistenceRepository';

const app: Express = express();
app.use(express.json());
const userController = Container.get(UserController);

app.post('/users', (req, res) => {
  userController.createUser(req, res);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
