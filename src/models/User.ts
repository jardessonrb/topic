import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Comment } from "./Comment";
import { Topic } from "./Topic";
import { VoteRecord } from "./VoteRecord";

@Entity('users')
class User{

  @PrimaryGeneratedColumn("uuid" , {name: 'id_user'})
  @Generated("uuid")
  id: string;

  @Column({name: 'name_user'})
  name: string;

  @Column({name: 'password_user'})
  password: string;

  @Column({name: 'email_user'})
  email: string;

  @Column({type: 'timestamp'})
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @OneToMany(() => Topic, topic => topic.user)
  topics: Topic[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => VoteRecord, voteRecords => voteRecords.user)
  voteRecords: VoteRecord[];

}

export { User };
