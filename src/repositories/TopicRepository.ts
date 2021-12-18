import { EntityRepository, Repository } from "typeorm";
import { Topic } from "../models/Topic";

@EntityRepository(Topic)
class TopicRepository  extends Repository<Topic> {

}
export { TopicRepository  };
