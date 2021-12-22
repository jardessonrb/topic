"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicView = void 0;
var TopicView = /** @class */ (function () {
    function TopicView() {
    }
    TopicView.viewTopics = function (topics) {
        var _this = this;
        var topicsView = topics.map(function (topic) {
            return _this.viewTopic(topic);
        });
        return topicsView;
    };
    TopicView.viewTopic = function (topic) {
        var user = topic.user, rest = __rest(topic, ["user"]);
        rest;
        var nameUser = user.name; //topic.user.name não funciona corretamente
        return {
            id: rest.id,
            situation: this.defineSituation(topic.upVotes, topic.downVotes),
            title: rest.title,
            body: rest.body,
            upVotes: rest.upVotes,
            downVotes: rest.downVotes,
            createdAt: rest.createdAt,
            isClosed: rest.isClosed,
            nameUser: nameUser,
            comments: (!rest.comments) ? [] : rest.comments
        };
    };
    TopicView.defineSituation = function (upVotes, downVotes) {
        if (upVotes > downVotes) {
            return "Positiva";
        }
        else if (downVotes > upVotes) {
            return "Negativa";
        }
        else {
            return "Empate em votos";
        }
    };
    return TopicView;
}());
exports.TopicView = TopicView;
