const http = require("http");
const app = require("./app");
const fs = require("fs");

const port = 3000;

const server = http.createServer(app);

server.listen(port);
