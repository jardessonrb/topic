import { VoteRecord } from "../models/VoteRecord";

class VoteRecordView{
  static viewVoteRecord(voteRecord: VoteRecord){
    return {
      typeVote: voteRecord.typeVote,
      id: voteRecord.id,
      createdAt: voteRecord.createdAt
    }

  }
}


export { VoteRecordView };
