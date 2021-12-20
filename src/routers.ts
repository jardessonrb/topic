import { Router } from 'express';
import { CommentController } from './controllers/CommentController';
import { TopicController } from './controllers/TopicController';
import { UserController } from './controllers/UserController';
const routers = Router();

routers.post("/user", UserController.createUser);
routers.get("/user/login", UserController.logIn);

routers.post("/topic", TopicController.createTopic);
routers.patch("/topic/close", TopicController.closeTopic);
routers.get("/topic", TopicController.listTopics);
routers.post("/topic/vote", TopicController.registerVote);
routers.get("/topic/:topicId", TopicController.findTopic);

routers.post("/comment", CommentController.createComment);


export { routers };
