const express = require("express");
const mongoose = require("mongoose");
const databaseConfig = require("./config/database");
const cors = require("cors");
const io = require("socket.io");
const http = require("http");

class App {
    constructor() {
        this.express = express();
        this.isDev = process.env.NODE_ENV !== "production";

        this.http = http.Server(this.express);
        this.socket = io(this.http);
        this.cors();
        this.io();
        this.database();
        this.middlewares();
        this.routes();
    }

    cors() {
        this.express.use(cors());
    }

    io() {
        this.express.use((req, res, next) => {
            req.io = this.socket;

            next();
        });
    }

    database() {
        mongoose.connect(databaseConfig.uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.use(require("./routes"));
    }
}

module.exports = new App().http;
