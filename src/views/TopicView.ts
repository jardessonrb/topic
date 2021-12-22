import { Topic } from "../models/Topic";
import { User } from "../models/User";

class TopicView {

  static viewTopics(topics: Topic[]){
    const topicsView = topics.map(topic => {
      return this.viewTopic(topic);
    })

    return topicsView;
  }

  static viewTopic(topic: Topic){
    console.log(topic);
    const { user, ...rest} = topic;
    rest as Topic;
    const nameUser = user.name; //topic.user.name não funciona corretamente

    return {
      id: rest.id,
      situation: this.defineSituation(topic.upVotes, topic.downVotes),
      title: rest.title,
      body: rest.body,
      upVotes: rest.upVotes,
      downVotes: rest.downVotes,
      createdAt: rest.createdAt,
      isClosed: rest.isClosed,
      nameUser,
      comments: rest.comments
    }
  }

  private static defineSituation(upVotes: number, downVotes: number): string{
    if(upVotes > downVotes){
      return "Positiva"
    }else if(downVotes > upVotes){
      return "Negativa"
    }else{
      return "Empate em votos"
    }
  }
}


export { TopicView };
