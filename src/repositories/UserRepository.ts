import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async findById(userId: string): Promise<User>{
    try {
      return await this.findOne(userId);

    } catch (error) {
      throw new Error();
    }
  }

  async existUser(email: string): Promise<boolean>{
    try {
      const user = await this.findOne({where: {email: email}});
      return user ? true : false;

    } catch (error) {
      throw new Error();
    }
  }
}

export { UserRepository };
