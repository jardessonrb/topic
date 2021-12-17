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
exports.Topic = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Comment_1 = require("./Comment");
var VoteRecord_1 = require("./VoteRecord");
var Topic = /** @class */ (function () {
    function Topic() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: 'id_topic' }),
        (0, typeorm_1.Generated)('uuid'),
        __metadata("design:type", String)
    ], Topic.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: 'title_topic' }),
        __metadata("design:type", String)
    ], Topic.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: 'body_topic' }),
        __metadata("design:type", String)
    ], Topic.prototype, "body", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: 'up_votes', type: 'int' }),
        __metadata("design:type", Number)
    ], Topic.prototype, "positiveVotes", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: 'down_votes', type: 'int' }),
        __metadata("design:type", Number)
    ], Topic.prototype, "negativeVotes", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: 'is_closed', type: 'boolean', default: 'false' }),
        __metadata("design:type", Boolean)
    ], Topic.prototype, "isClosed", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp' }),
        (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
        __metadata("design:type", Date)
    ], Topic.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.topics; }),
        __metadata("design:type", User_1.User)
    ], Topic.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Comment_1.Comment; }, function (comments) { return comments.topic; }),
        __metadata("design:type", Array)
    ], Topic.prototype, "comments", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return VoteRecord_1.VoteRecord; }, function (voteRecords) { return voteRecords.topic; }),
        __metadata("design:type", Array)
    ], Topic.prototype, "voteRecords", void 0);
    Topic = __decorate([
        (0, typeorm_1.Entity)('topics')
    ], Topic);
    return Topic;
}());
exports.Topic = Topic;
