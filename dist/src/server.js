"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./database/connection");
require("./database/connection");
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var routers_1 = require("./routers");
var application = (0, express_1.default)();
var portRunningServer = process.env.PORT || 3333;
application.use(express_1.default.json());
application.use(routers_1.routers);
application.listen(portRunningServer, function () {
    console.log("server is running in port:", portRunningServer);
});
