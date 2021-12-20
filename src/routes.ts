import { Request, Response, Router } from 'express';
import { CommentController } from './controllers/CommentController';
import { TopicController } from './controllers/TopicController';
import { UserController } from './controllers/UserController';
const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  return response.send("<h1 align=\"center\">Bem-Vindo(a) a API TOPIC</h1>");
})
routes.post("/user", UserController.createUser);
routes.get("/user/login", UserController.logIn);

routes.post("/topic", TopicController.createTopic);
routes.patch("/topic/close", TopicController.closeTopic);
routes.get("/topic", TopicController.listTopics);
routes.post("/topic/vote", TopicController.registerVote);
routes.get("/topic/:topicId", TopicController.findTopic);
routes.get("/topic/my-topics/:userId", TopicController.listTopicsByUser);

routes.post("/comment", CommentController.createComment);


export { routes };
