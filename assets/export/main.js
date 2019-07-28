"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var clientsource = path.join(__dirname, "/../client/");
var exportsource = path.join(__dirname, "/../export/");
var serversource = path.join(__dirname, "/./");
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port;
        this.app = express();
    }
    Server.prototype.run = function () {
        this.app.get("/", function (req, res) {
            res.sendFile(clientsource + "index.html");
        });
        this.app.listen(this.port);
        console.log("Listening on port " + this.port);
    };
    return Server;
}());
var server = new Server(8888);
server.run();
