import { VoteRecord } from "../models/VoteRecord";
import { VoteRecordResponse } from "../types/objects-responses";

class VoteRecordView{
  static viewVoteRecord(voteRecord: VoteRecord): VoteRecordResponse{
    return {
      typeVote: voteRecord.typeVote,
      id: voteRecord.id,
      createdAt: voteRecord.createdAt
    }

  }
}

export { VoteRecordView };
