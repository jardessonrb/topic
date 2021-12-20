import { Comment } from "../../models/Comment";

type TopicResponse = {
  id: string;
  situation?: string;
  title: string;
  body: string;
  upVotes: number;
  downVotes: number;
  isClosed: boolean;
  createdAt: Date;
  nameUser: string;
  comments: Comment[];
}

export { TopicResponse };
