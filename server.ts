import './src/database/connection';
import 'dotenv/config';
import express from "express";
import cors from 'cors';
import { routers } from "./src/routers";

const application       = express();
const portRunningServer = process.env.PORT || 3333;

application.use(cors());
application.use(express.json());
application.use(routers);

application.listen(portRunningServer, () => {
    console.log("server is running in port:", portRunningServer);
});
