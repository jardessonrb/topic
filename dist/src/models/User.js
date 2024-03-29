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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var Comment_1 = require("./Comment");
var Topic_1 = require("./Topic");
var VoteRecord_1 = require("./VoteRecord");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid", { name: 'id_user' }),
        (0, typeorm_1.Generated)("uuid"),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: 'name_user' }),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: 'password_user' }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ name: 'email_user' }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp' }),
        (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
        __metadata("design:type", Date)
    ], User.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Topic_1.Topic; }, function (topic) { return topic.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "topics", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Comment_1.Comment; }, function (comment) { return comment.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "comments", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return VoteRecord_1.VoteRecord; }, function (voteRecords) { return voteRecords.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "voteRecords", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)('users')
    ], User);
    return User;
}());
exports.User = User;
