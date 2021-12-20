import { EntityRepository, getConnection, Repository } from "typeorm";
import { Topic } from "../models/Topic";
import { User } from "../models/User";
import { CommentRepository } from "./CommentRepository";
import { VoteRecordRepository } from "./VoteRecordRepository";

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
      const commentRepository = getConnection().getCustomRepository(CommentRepository);
      for (let i = 0; i < topics.length; i++) {
        topics[i].comments = await commentRepository.findCommentByTopic(topics[i]);
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

  async userIsOwnerTopic(topicId: string, userId: string): Promise<boolean>{

    try {
      const topic: Topic = await this.createQueryBuilder("topics")
                                .innerJoinAndSelect("topics.user", "user")
                                .where("topics.id_topic = :id", {id: topicId})
                                .getOne();

      const userIdOwnerTopic = topic.user.id;
      return userIdOwnerTopic === userId;

    } catch (error) {
      throw new Error();
    }
  }

  async closeTopic(topicId: string): Promise<void>{
    try {
      const res = await this.createQueryBuilder().update(Topic)
                            .set({
                              isClosed: true
                            })
                            .where("id_topic = :topicId", {topicId})
                            .execute();

    } catch (error) {
      throw new Error();
    }
  }

  async topicAlreadyVoted(topic: Topic, user: User): Promise<boolean>{

    try {
      const voteRecordRepository = getConnection().getCustomRepository(VoteRecordRepository);
      const voteRecord = await voteRecordRepository.findOne({where: {topic, user}});
      return !!voteRecord;

    } catch (error) {
      throw new Error();
    }
  }

  async listTopicsByUser(user: User, page: number, limit: number): Promise<any[]>{
    try {
      const offSet = (page - 1) * limit;
      limit = limit * page;

      const result: any[] =  await this.createQueryBuilder("topics")
                            .innerJoinAndSelect("topics.user", "user")
                            .where("topics.userId = :id", {id: user.id})
                            .offset(offSet)
                            .limit(limit)
                            .execute();

      const commentRepository = getConnection().getCustomRepository(CommentRepository);
      const topics = result.map(function(topic){
        return {
          id: topic.topics_id_topic,
          title: topic.topics_title_topic,
          body: topic.topics_body_topic,
          upVotes: topic.topics_up_votes,
          downVotes: topic.topics_down_votes,
          isClosed: topic.topics_is_closed,
          createdAt: topic.topics_created_at,
          nameUser: topic.user_name_user
        }
      })

      return topics;
    } catch (error) {
      throw new Error();
    }
  }
}
export { TopicRepository  };
