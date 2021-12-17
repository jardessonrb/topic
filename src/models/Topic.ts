import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";
import { Comment } from './Comment';
import { VoteRecord } from "./VoteRecord";

@Entity('topics')
class Topic{

  @PrimaryGeneratedColumn("uuid" , {name: 'id_topic'})
  @Generated('uuid')
  id: string;

  @Column({name: 'title_topic'})
  title: string;

  @Column({name: 'body_topic'})
  body: string;

  @Column({name: 'up_votes', type: 'int'})
  positiveVotes: number;

  @Column({name: 'down_votes', type: 'int'})
  negativeVotes: number;

  @Column({name: 'is_closed', type: 'boolean', default: 'false'})
  isClosed: boolean;

  @Column({type: 'timestamp'})
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @ManyToOne(() => User, user => user.topics)
  user: User;

  @OneToMany(() => Comment, comments => comments.topic)
  comments: Comment[];

  @OneToMany(() => VoteRecord, voteRecords => voteRecords.topic)
  voteRecords: VoteRecord[];

}

export { Topic };
