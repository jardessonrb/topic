import { Request, Response } from "express";
import { Topic } from "../models/Topic";
import { User } from "../models/User";
import * as Yup from 'yup';
import { ResponseError, ResponseErrorServer, ResponseSuccess } from "../types/responses";
import { getConnection } from "typeorm";
import { TopicRepository } from "../repositories/TopicRepository";
import { UserRepository } from "../repositories/UserRepository";
import { CommentRepository } from "../repositories/CommentRepository";

class CommentController{
  static async createComment(request: Request, response: Response ): Promise<Response>{
    const { topicId, userId, body } = request.body;

    let user: User;
    let topic: Topic;
    const schemaValidation = Yup.object().shape({
      userId: Yup.string().required("O usuario é obrigatorio").uuid("Identificador não válido"),
      topicId: Yup.string().required("O topico é obrigatorio").uuid("Identificador não válido"),
      body: Yup.string().required("O corpo do comentario é obrigatorio")
    });

    try {
      await schemaValidation.validate({userId, topicId, body}, {
        abortEarly: false
      });
    } catch (error) {
      const res: ResponseError = {message: "Erro de validação", type: "error validation", errors: error.errors}
      return response.status(403).json(res);
    }

    const topicRepository = getConnection().getCustomRepository(TopicRepository);
    const commentRepository = getConnection().getCustomRepository(CommentRepository);
    try {
      user = await getConnection().getCustomRepository(UserRepository).findOne(userId);
      if(!user){
        const res: ResponseError = {message: "Usuario não valido", type: "error validation", errors: []}
        return response.status(403).json(res);
      }

      topic = await topicRepository.findOne(topicId);
      if(!topic){
        const res: ResponseError = {message: "Topico não valido", type: "error validation", errors: []}
        return response.status(403).json(res);
      }

    } catch (error) {
      const res: ResponseErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }

    const commentCreated = commentRepository.create({
      user,
      topic,
      body
    })

    try {
      const comment = await commentRepository.save(commentCreated);
      const res: ResponseSuccess = {message: "Comentario criado com sucesso", type: "success", body: comment};
      return response.status(200).json(res);
    } catch (error) {
      const res: ResponseErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }
  }
}

export { CommentController };
