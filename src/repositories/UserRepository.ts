import { response, Response } from "express";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";


@EntityRepository(User)
class UserRepository extends Repository<User> {

  async createUser(user: User): Promise<Response>{

    return response;
  }
}


export { UserRepository };
