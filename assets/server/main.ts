import express = require("express");
import path = require("path");

const clientsource: string = path.join(__dirname, "/../client/");
const exportsource: string = path.join(__dirname, "/../export/");
const serversource: string = path.join(__dirname, "/./");

class Server {
    app: express.Application;
    port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
    }

    run(): void {
        this.app.get("/", (req, res) => {
            res.sendFile(exportsource + "index.html");
        });

        this.app.listen(this.port);
        console.log("Listening on port " + this.port);
    }
}

const server = new Server(8888);
server.run();
