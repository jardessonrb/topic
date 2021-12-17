import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { ResponseSuccess } from '../types/ResponseSuccess';
import { ResponseError } from '../types/ResponseError';
class UserController {

  static async createUser(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
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
}

export { UserController };
