import { EntityRepository, Repository } from "typeorm";
import { Comment } from "../models/Comment";
import { Topic } from "../models/Topic";

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment>{
  async findCommentByTopic(topic: Topic): Promise<Comment[]>{
    try {
      return await this.find({where: {topic}});

    } catch (error) {
      throw new Error();
    }
  }
}

export { CommentRepository };
