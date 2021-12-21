import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../models/User";
import { TopicRepository } from "../repositories/TopicRepository";
import { UserRepository } from "../repositories/UserRepository";
import { ResponseError, ResponseErrorServer, ResponseSuccess } from "../types/responses";
import * as Yup from "yup";
import { Topic } from "../models/Topic";
import { VoteRecordRepository } from "../repositories/VoteRecordRepository";
import { TopicView } from "../views/TopicView";
import { VoteRecordView } from "../views/VoteRecordView";

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
        const res: ResponseError = {message: "Usuario não valido", type: "error validation", errors: []}
        return response.status(403).json(res);
      }

    } catch (error) {
      const res: ResponseErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
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
      const topicResponse = TopicView.viewTopic(topic);

      const res: ResponseSuccess = {message: "Topico criado com sucesso", type: "success", body: topicResponse};
      return response.status(200).json(res);
    } catch (error) {
      const res: ResponseErrorServer = {message:"Erro no servidor", type: "error server", errors: []};
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
      const topicsResponse = TopicView.viewTopics(topics);

      const res: ResponseSuccess = {message: isFullListing ? "Lista de todos os topicos" : "Topicos em aberto", type: "success", body: topicsResponse};
      return response.status(200).json(res);

    } catch (error) {
      const res: ResponseErrorServer = {message:"Erro no servidor", type: "error server", errors: []}
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

      topic = await topicRepository.findOne(topicId);
      if(!topic){
        const res: ResponseError = {message: "Topico não valido", type: "error validation", errors: []}
        return response.status(403).json(res);
      }

      if(topic.isClosed){
        const res: ResponseError = {message: "Esse tópico já está fechado para votação", type: "error validation", errors: []};
        return response.status(403).json(res);
      }

      user = await getConnection().getCustomRepository(UserRepository).findOne(userId);
      if(!user){
        const res: ResponseError = {message: "Usuario não valido", type: "error validation", errors: []}
        return response.status(403).json(res);
      }

      if(await topicRepository.topicAlreadyVoted(topic, user)){
        const res: ResponseError = {message: "Usuario já voltou nesse topico", type: "error validation", errors: []};
        return response.status(403).json(res);
      }


    } catch (error) {
      const res: ResponseErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }

    const queryRunnerTransaction = getConnection().createQueryRunner();
    await queryRunnerTransaction.startTransaction();
    try {
      topicRepository.insertVote(typeVote, topicId);
      const voteRecord = await getConnection().getCustomRepository(VoteRecordRepository).registerRecord(typeVote, user, topic);
      const voteRecordResponse = VoteRecordView.viewVoteRecord(voteRecord);

      await queryRunnerTransaction.commitTransaction();

      const res: ResponseSuccess = {message: "Voto registrado com sucesso", type: "success", body: voteRecordResponse};
      return response.status(200).json(res);

    } catch (error) {
      await queryRunnerTransaction.rollbackTransaction();

      const res: ResponseErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);

    }finally{
      await queryRunnerTransaction.release();
    }
  }

  static async findTopic(request: Request, response: Response ): Promise<Response>{
    const { topicId } = request.params;
    const schemaValidation = Yup.string().uuid();

    if(!await schemaValidation.isValid(topicId)){
      const res: ResponseError = {message: "Erro de validação, topico não valido", type: "error validation", errors: []}
      return response.status(403).json(res);
    }

    try {
      const topic = await getConnection().getCustomRepository(TopicRepository).findOneTopic(topicId);
      if(!topic){
        const res: ResponseSuccess = {message: "Nenhum topico encontrado", type: "success", body: {}};
        return response.status(200).json(res);
      }

      const topicResponse = TopicView.viewTopic(topic);
      const res: ResponseSuccess = {message: "Topico encontrado", type: "success", body: topicResponse};
      return response.status(200).json(res);

    } catch (error) {
      const res: ResponseErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }
  }

  static async closeTopic(request: Request, response: Response ): Promise<Response>{
    const { topicId, userId} =  request.body;

    const schemaValidation = Yup.object().shape({
      userId: Yup.string().required("O usuario é obrigatorio").uuid("Identificador não válido"),
      topicId: Yup.string().required("O topico é obrigatorio").uuid("Identificador não válido")
    });

    try {
      await schemaValidation.validate({userId, topicId}, {
        abortEarly: false
      });

    } catch (error) {
      const res: ResponseError = {message: "Erro de validação", type: "error validation", errors: error.errors}
      return response.status(403).json(res);
    }

    const topicRepository = getConnection().getCustomRepository(TopicRepository);
    try {
      if(!await topicRepository.userIsOwnerTopic(topicId, userId)){
        const res: ResponseError = {message: "Usuario não autorizado a fechar esse topico", type: "error validation", errors: []};
        return response.status(403).json(res);
      }

      topicRepository.closeTopic(topicId);
      const res: ResponseSuccess = {message: "Topico fechado com sucesso", type: "success", body: {}};
      return response.status(200).json(res);

    } catch (error) {
      const res: ResponseErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }

  }

  static async listTopicsByUser(request: Request, response: Response ): Promise<Response>{
    const { userId } = request.params;
    const { page = 1, limit = 10 } = request.query;

    const schemaValidation = Yup.string().uuid();

    if(!await schemaValidation.isValid(userId)){
      const res: ResponseError = {message: "Erro de validação, usuario não valido", type: "error validation", errors: []}
      return response.status(403).json(res);
    }
    const topicRepository = getConnection().getCustomRepository(TopicRepository);
    try {
      const user = await getConnection().getCustomRepository(UserRepository).findOne(userId);
      if(!user){
        const res: ResponseError = {message: "Usuario não valido", type: "error validation", errors: []}
        return response.status(403).json(res);
      }

      const topics = await topicRepository.listTopicsByUser(user, Number(page), Number(limit));
      const topicsResponse = TopicView.viewTopics(topics);
      const res: ResponseSuccess = {message: "Topicos buscados", type: "success", body: topicsResponse};
      return response.status(200).json(res);

    } catch (error) {
      const res: ResponseErrorServer = {message: "Erro no servidor", type: "error server", errors: []};
      return response.status(500).json(res);
    }

  }
}


export {  TopicController };
