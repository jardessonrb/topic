import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { ResponseSuccess, ResponseError, ResponseErrorServer } from '../types';
import * as Yup from 'yup';

class UserController {

  static async createUser(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const schemaValidation = Yup.object().shape({
      name: Yup.string().required("O nome de usuario é obrigatorio"),
      email: Yup.string().required("O email é obrigatorio").email("email invalido"),
      password: Yup.string().required("A senha é obrigatorio").min(6, "Senha deve ter no minimo 6 caracteres")
    });

    try {
      await schemaValidation.validate({name, email, password}, {
        abortEarly: false
      });
    } catch (error) {
      const res: ResponseError = {message: "Erro de validação", type: "error validation", errors: error.errors}
        return response.status(403).json(res);
    }

    const userRepository = getConnection().getCustomRepository(UserRepository);
    const userCreated = userRepository.create({
      name,
      email,
      password
    });

    try {
      const user = await userRepository.save(userCreated);
      const res: ResponseSuccess = {message: "Usuario cadastrado", type: "success", body: user};
      return response.status(200).json(res);

    } catch (error) {
      const res: ResponseError = {message: "Erro no servidor", type: "error"}
      return response.status(500).json(res);
    }
  }

  static async logIn(request: Request, response: Response): Promise<Response> {
    const { email, password} = request.body;
    const userRepository = getConnection().getCustomRepository(UserRepository);

    const schemaValidation = Yup.object().shape({
      email: Yup.string().required("O email é obrigatorio").email("email invalido"),
      password: Yup.string().required("A senha é obrigatorio").min(6, "Senha deve ter no minimo 6 caracteres")
    });

    try {
      await schemaValidation.validate({email, password}, {
        abortEarly: false
      });
    } catch (error) {
      const res: ResponseError = {message: "Erro de validação", type: "error validation", errors: error.errors}
        return response.status(403).json(res);
    }

    try {
      const user = await userRepository.findOne({where: {email: email, password: password}});
      if(user){
        const res: ResponseSuccess = {message: "Usuario logado", type: "success", body: user};
        return response.status(200).json(res);
      }
      const res: ResponseSuccess = {message: "Usuario não permitido", type: "success", body: user};
      return response.status(403).json(res);

    } catch (error) {
      const res: ResponseErrorServer = {message: "Erro no servidor", type: "error server"}
      return response.status(500).json(res);
    }


  }
}

export { UserController };
