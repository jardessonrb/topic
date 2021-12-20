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
exports.Comment = void 0;
var typeorm_1 = require("typeorm");
var Topic_1 = require("./Topic");
var User_1 = require("./User");
var Comment = /** @class */ (function () {
    function Comment() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: 'id_comment' }),
        (0, typeorm_1.Generated)('uuid'),
        __metadata("design:type", String)
    ], Comment.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: 'body_comment' }),
        __metadata("design:type", String)
    ], Comment.prototype, "body", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp' }),
        (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
        __metadata("design:type", Date)
    ], Comment.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Topic_1.Topic; }, function (topic) { return topic.comments; }),
        __metadata("design:type", Topic_1.Topic)
    ], Comment.prototype, "topic", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.comments; }),
        __metadata("design:type", User_1.User)
    ], Comment.prototype, "user", void 0);
    Comment = __decorate([
        (0, typeorm_1.Entity)('comments')
    ], Comment);
    return Comment;
}());
exports.Comment = Comment;
