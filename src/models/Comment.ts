import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Topic } from "./Topic";

@Entity('comments')
class Comment{

  @PrimaryGeneratedColumn("uuid" , {name: 'id_comment'})
  @Generated('uuid')
  id: string;

  @Column({name: 'body_comment'})
  body: string;

  @Column({type: 'timestamp'})
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @ManyToOne(() => Topic, topic => topic.comments)
  topic: Topic;

}

export { Comment };
