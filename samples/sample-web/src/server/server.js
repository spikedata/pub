const path = require("path");
const express = require("express");
const pdf = require("./pdf");

// config
const _port = 5000;
const _root = path.join(__dirname, "..", "ux");
const _url = "http://localhost:" + _port;
const _sizeLimit = "10mb";

let server;

function start() {
  const app = express();
  app.use(express.json({ limit: _sizeLimit }));
  app.use("/", express.static(_root));
  app.post("/pdf", pdf);
  server = app.listen(_port, () => console.log(`listening: ${_url}`));
}

function stop() {
  server.close();
}

function run() {
  start();
}

run();
