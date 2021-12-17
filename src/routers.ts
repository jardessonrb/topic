import { Router } from 'express';
import { UserController } from './controllers/UserController';
const routers = Router();

routers.post("/user", UserController.createUser);

export { routers };
