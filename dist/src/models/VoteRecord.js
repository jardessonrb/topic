"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteRecord = void 0;
var typeorm_1 = require("typeorm");
var Topic_1 = require("./Topic");
var User_1 = require("./User");
var VoteRecord = /** @class */ (function () {
    function VoteRecord() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: 'id_vote_record' }),
        (0, typeorm_1.Generated)('uuid'),
        __metadata("design:type", String)
    ], VoteRecord.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: "type_vote", type: "boolean" }),
        __metadata("design:type", Boolean)
    ], VoteRecord.prototype, "typeVote", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp' }),
        (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
        __metadata("design:type", Date)
    ], VoteRecord.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Topic_1.Topic; }, function (topic) { return topic.voteRecords; }),
        __metadata("design:type", Topic_1.Topic)
    ], VoteRecord.prototype, "topic", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.voteRecords; }),
        __metadata("design:type", User_1.User)
    ], VoteRecord.prototype, "user", void 0);
    VoteRecord = __decorate([
        (0, typeorm_1.Entity)('vote_records')
    ], VoteRecord);
    return VoteRecord;
}());
exports.VoteRecord = VoteRecord;
