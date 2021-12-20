"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserView = void 0;
var UserView = /** @class */ (function () {
    function UserView() {
    }
    UserView.viewUsers = function (users) {
        var _this = this;
        var usersView = users.map(function (user) {
            return _this.viewUser(user);
        });
        return usersView;
    };
    UserView.viewUser = function (user) {
        return {
            id: user.id,
            name: user.name
        };
    };
    return UserView;
}());
exports.UserView = UserView;
