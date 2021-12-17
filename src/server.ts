import './database/connection';
import "./database/connection";
import 'dotenv/config';
import express from "express";
import { routers } from "./routers";

const application       = express();
const portRunningServer = process.env.PORT || 3333;

application.use(express.json());
application.use(routers);

application.listen(portRunningServer, () => {
    console.log("server is running in port:", portRunningServer);
});
