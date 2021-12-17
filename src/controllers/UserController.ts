import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';

class UserController {

  static async createUser(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const userRepository = getConnection().getCustomRepository(UserRepository);

    const userCreated = userRepository.create({
      name,
      email,
      password
    });

    const user = await userRepository.save(userCreated);

    return response.status(200).json(user);
  }
}


export { UserController };
