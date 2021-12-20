"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
        return __assign(__assign({ situation: this.defineSituation(topic.upVotes, topic.downVotes) }, topic), { user: {} });
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
