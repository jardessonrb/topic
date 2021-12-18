import { EntityRepository, Repository } from "typeorm";
import { Topic } from "../models/Topic";
import { User } from "../models/User";
import { VoteRecord } from "../models/VoteRecord";

@EntityRepository(VoteRecord)
class VoteRecordRepository extends Repository<VoteRecord>{
  async registerRecord(typeVote: boolean, user: User, topic: Topic): Promise<VoteRecord>{
    try {
      const voteRecordCreated = this.create({
        typeVote,
        user,
        topic
      });

      return await this.save(voteRecordCreated);
    } catch (error) {
      throw new Error();
    }
  }
}


export { VoteRecordRepository };
