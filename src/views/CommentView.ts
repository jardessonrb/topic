import { Comment } from "../models/Comment";
import { CommentReponse } from "../types/objects-responses";

class CommentView {

  static viewComment(comment: Comment): CommentReponse{
    const { user, topic, ...restComment} = comment;
    restComment as Comment;
    return {
      body: restComment.body,
      id: restComment.id,
      nameUser: user.name,
      createdAt: restComment.createdAt
    }
  }
}

export { CommentView };
