"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
var express_1 = require("express");
var UserController_1 = require("./controllers/UserController");
var routers = (0, express_1.Router)();
exports.routers = routers;
routers.post("/user", UserController_1.UserController.createUser);
routers.get("/user/login", UserController_1.UserController.logIn);
