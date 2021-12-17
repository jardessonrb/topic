import './database/connection';
import 'dotenv/config';
import express from "express";
import cors from 'cors';
import { routers } from "./routers";

const application       = express();
const portRunningServer = process.env.SERVER_PORT || 3333;

application.use(cors());
application.use(express.json());
application.use(routers);

application.listen(portRunningServer, () => {
    console.log("server is running in port:", portRunningServer);
});
