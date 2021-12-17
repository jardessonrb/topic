import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import { Topic } from "./Topic";
import { User } from "./User";

@Entity('vote_records')
class VoteRecord{

  @PrimaryGeneratedColumn("uuid" , {name: 'id_vote_record'})
  @Generated('uuid')
  id: string;

  @Column({type: 'timestamp'})
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @ManyToOne(() => Topic, topic => topic.voteRecords)
  topic: Topic;

  @ManyToOne(() => User, user => user.voteRecords)
  user: User;

}

export { VoteRecord };
