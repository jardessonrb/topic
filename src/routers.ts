import { Router } from 'express';
import { TopicController } from './controllers/TopicController';
import { UserController } from './controllers/UserController';
const routers = Router();

routers.post("/user", UserController.createUser);
routers.get("/user/login", UserController.logIn);

routers.post("/topic", TopicController.createTopic);
routers.get("/topic", TopicController.listTopics);
routers.post("/topic/vote", TopicController.registerVote);



export { routers };
