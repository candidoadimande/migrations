import express from "express";
//import authMiddleware from "./middlewares/auth.js"
import routes from "./routes.js"

import "./database";

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({extended: false}));
        //this.server.use(authMiddleware);
    }

    routes() {
        this.server.use(routes);
    }
}


export default new App().server;