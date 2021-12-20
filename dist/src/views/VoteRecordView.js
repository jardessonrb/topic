"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteRecordView = void 0;
var VoteRecordView = /** @class */ (function () {
    function VoteRecordView() {
    }
    VoteRecordView.viewVoteRecord = function (voteRecord) {
        return {
            typeVote: voteRecord.typeVote,
            id: voteRecord.id,
            createdAt: voteRecord.createdAt
        };
    };
    return VoteRecordView;
}());
exports.VoteRecordView = VoteRecordView;
