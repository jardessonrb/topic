import { EntityRepository, Repository } from "typeorm";
import { Comment } from "../models/Comment";
import { Topic } from "../models/Topic";

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment>{

  async findCommentByTopic(topic: Topic): Promise<Comment[]>{
    try {
      const result = await this.createQueryBuilder("comments")
                                  .select(["comments.id_comment", "comments.body_comment","comments.created_at", "user.name_user"])
                                  .innerJoinAndSelect("comments.user", "user")
                                  .where("comments.topicId = :id", {id: topic.id})
                                  .execute();
      const comments = result.map((comment: any) => {
        return {
          body: comment.body_comment,
          createdAt: comment.created_at,
          id: comment.created_at,
          nameUser: comment.name_user
        };
      })

      return comments;

    } catch (error) {
      throw new Error();
    }
  }
}

export { CommentRepository };
