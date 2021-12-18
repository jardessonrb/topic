import { EntityRepository, Repository } from "typeorm";
import { Topic } from "../models/Topic";

@EntityRepository(Topic)
class TopicRepository  extends Repository<Topic> {
  async listTopics(page: number, limit: number, isFull?: boolean): Promise<Topic[]>{

    try {
      const offSet = (page - 1) * limit;
      limit = limit * page;
      let topics: Topic[];

      if(isFull) {
        topics = await this.find({
                            order: {createdAt: 'DESC'},
                            skip: offSet,
                            take: limit});
      }else{
        topics = await this.find({
                            where: {isClosed: false},
                            order: {createdAt: 'DESC'},
                            skip: offSet,
                            take: limit});
      }

      return topics;

    } catch (error) {
      throw new Error();
    }
  }

  async insertVote(typeVote: boolean, topicId: string): Promise<void>{
    try {
      if(typeVote){
        await this.manager.createQueryBuilder().update(Topic).set({
          upVotes: () => "up_votes + 1"
        }).where("id_topic = :topicId", {topicId: topicId})
        .execute()
      }else{
        await this.manager.createQueryBuilder().update(Topic).set({
          downVotes: () => "down_votes + 1"
        }).where("id_topic = :topicId", {topicId: topicId})
        .execute()
      }

    } catch (error) {
      throw new Error();
    }
  }
}
export { TopicRepository  };
