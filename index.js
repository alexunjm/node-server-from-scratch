/**
 * Primary file for the API
 */

// Dependencies
const http = require("http");
const { defaultHandler } = require("./handler");
const _data = require("./lib/data");

(async () => {
  await _data
    .delete("sample", "exampleFile")
    .then(console.log)
    .catch(console.error);

  await _data
    .create("sample", "exampleFile", { hola: "adios" })
    .then(console.log)
    .catch(console.error);

  await _data
    .update("sample", "exampleFile", { foos: "barua" })
    .then(console.log)
    .catch(console.error);

  await _data
    .read("sample", "exampleFile")
    .then(console.log)
    .catch(console.error);
})()
  .then(console.log)
  .catch(console.error);
/*
 */

// create a server and handle requests with string response
const server = http.createServer(defaultHandler);

// set default port
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// listen server on port PORT
server.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT} \n ${NODE_ENV}`);
});

/* 
const https = require("https");
const fs = require("fs");

const httpsServerOptions = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem"),
};

// create a server and handle requests with string response
const secureServer = https.createServer(httpsServerOptions, defaultHandler);

// listen secureServer on port 3001
secureServer.listen(3001, () => {
  console.log("secureServer started on port 3001");
});
 */
