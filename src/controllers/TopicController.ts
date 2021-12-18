import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../models/User";
import { TopicRepository } from "../repositories/TopicRepository";
import { UserRepository } from "../repositories/UserRepository";
import { ResponseError, ResponseErrorServer, ResponseSuccess } from "../types";
import * as Yup from "yup";
import { Topic } from "../models/Topic";
import { VoteRecordRepository } from "../repositories/VoteRecordRepository";

class TopicController{

  static async createTopic(request: Request, response: Response ): Promise<Response>{
    const { title, body, userId } = request.body;
    let user: User;

    const schemaValidation = Yup.object().shape({
      title: Yup.string().required("O titulo do topico é obrigatorio"),
      body: Yup.string().required("O conteudo do topico é obrigatorio"),
      userId: Yup.string().required("O usuario é obrigatorio").uuid("Identificador não válido")
    });

    try {
      await schemaValidation.validate({title, body, userId}, {
        abortEarly: false
      });
    } catch (error) {
      const res: ResponseError = {message: "Erro de validação", type: "error validation", errors: error.errors}
        return response.status(403).json(res);
    }

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
    const topicRepository = getConnection().getCustomRepository(TopicRepository);

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
      const res: ResponseErrorServer = {message:"Erro no servidor", type: "error server"}
      return response.status(500).json(res);
    }
  }

  static async listTopics(request: Request, response: Response ): Promise<Response>{
    const { page = 1, limit = 10, full = false} = request.query;
    //Uma forma de pegar o valor correto, visto que Boolean(variavel) sempre retorna true para variaveis não vazias.
    const isFullListing: boolean = full.toString() === "true";
    const topicRepository = getConnection().getCustomRepository(TopicRepository);

    try {
      const topics = await topicRepository.listTopics(Number(page), Number(limit), isFullListing);
      const res: ResponseSuccess = {message: isFullListing ? "Lista de todos os topicos" : "Topicos em aberto", type: "success", body: topics};
      return response.status(200).json(res);

    } catch (error) {
      const res: ResponseErrorServer = {message:"Erro no servidor", type: "error server"}
      return response.status(500).json(res);
    }

  }

  static async registerVote(request: Request, response: Response ): Promise<Response>{
    const { userId, topicId, typeVote  } = request.body;
    let user: User;
    let topic: Topic;
    const schemaValidation = Yup.object().shape({
      userId: Yup.string().required("O usuario é obrigatorio").uuid("Identificador não válido"),
      topicId: Yup.string().required("O topico é obrigatorio").uuid("Identificador não válido"),
      typeVote: Yup.boolean().required("O tipo de voto é obrigatorio")
    });

    try {
      await schemaValidation.validate({userId, topicId, typeVote}, {
        abortEarly: false
      });
    } catch (error) {
      const res: ResponseError = {message: "Erro de validação", type: "error validation", errors: error.errors}
        return response.status(403).json(res);
    }

    const topicRepository = getConnection().getCustomRepository(TopicRepository);
    try {
      user = await getConnection().getCustomRepository(UserRepository).findOne(userId);
      if(!user){
        const res: ResponseError = {message: "Usuario não valido", type: "error validation"}
        return response.status(403).json(res);
      }

      topic = await topicRepository.findOne(topic);
      if(!topic){
        const res: ResponseError = {message: "Topico não valido", type: "error validation"}
        return response.status(403).json(res);
      }

    } catch (error) {
      const res: ResponseErrorServer = {message: "Erro no servidor", type: "error server"};
      return response.status(500).json(res);
    }

    const queryRunnerTransaction = getConnection().createQueryRunner();
    await queryRunnerTransaction.startTransaction();
    try {
      topicRepository.insertVote(typeVote, topicId);
      const voteRecord = await getConnection().getCustomRepository(VoteRecordRepository).registerRecord(typeVote, user, topic);

      await queryRunnerTransaction.commitTransaction();

      const res: ResponseSuccess = {message: "Voto registrado com sucesso", type: "success", body: voteRecord};
      return response.status(200).json(res);

    } catch (error) {
      await queryRunnerTransaction.rollbackTransaction();
      const res: ResponseErrorServer = {message: "Erro no servidor", type: "error server"};

      return response.status(500).json(res);

    }finally{
      await queryRunnerTransaction.release();
    }
  }
}


export {  TopicController };
