import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../models/User";
import { TopicRepository } from "../repositories/TopicRepository";
import { UserRepository } from "../repositories/UserRepository";
import { ResponseError } from "../types/ResponseError";
import { ResponseErrorServer } from "../types/ResponseErrorServer";
import { ResponseSuccess } from "../types/ResponseSuccess";

class TopicController{

  static async createTopic(request: Request, response: Response ): Promise<Response>{
    const { title, body, userId } = request.body;
    let user: User;
    const topicRepository = getConnection().getCustomRepository(TopicRepository);

    try {
      user = await getConnection().getCustomRepository(UserRepository).findById(userId);
      if(!user){
        const res: ResponseError = {message: "Usuario não valido", type: "error validation"}
        return response.status(403).json(res);
      }

    } catch (error) {
      const res: ResponseErrorServer = {message: "Erro no servidor", type: "error server"};
      return response.status(500).json(res);
    }

    const topicCreated = topicRepository.create({
      title,
      body,
      upVotes: 0,
      downVotes: 0,
      user
    });

    try {
      const topic = await topicRepository.save(topicCreated);
      const res: ResponseSuccess = {message: "Topico criado com sucesso", type: "success", body: topic};
      return response.status(200).json(res);
    } catch (error) {

    }

    return response;
  }
}


export {  TopicController };
