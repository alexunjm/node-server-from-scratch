/**
 * Primary file for the API
 */

// Dependencies
const http = require("http");
const https = require("https");
const querystring = require("querystring");
const StringDecoder = require("string_decoder").StringDecoder;
const fs = require("fs");

const defaultHandler = (req, res) => {
  // Get the path
  const [url, ...rest] = req.url.split("?");
  const trimmedPath = url.replace(/^\/+|\/+$/g, "");

  // Get the HTTP method
  const method = req.method.toLowerCase();

  // Get the query string as an object
  let queryStringObj = "";
  if (rest && rest.length > 0) {
    const [queryStr] = rest;
    queryStringObj = querystring.parse(queryStr, null, null);
  }

  // Get the payload, if any
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", (data) => {
    buffer += decoder.write(data);
  });
  req.on("end", () => {
    buffer += decoder.end();
    // Send the response
    res.end(
      `
      payload: ${buffer}
      `,
      () => {
        console.log("sending response");
      }
    );
  });

  // Send the status code
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);

  // Send the response
  res.write(
    `
    path: ${trimmedPath}
    `,
    (error) => {
      console.log(`error response ${error}`);
    }
  );
  // Send the response
  res.write(
    `
    method: ${method}
    `,
    (error) => {
      console.log(`error response ${error}`);
    }
  );
  // Send the response
  res.write(
    `
    queryStringObj: ${JSON.stringify(
      queryStringObj
    )}, headers: ${JSON.stringify(req.headers)}, payload: ${buffer}
    `,
    (error) => {
      console.log(`error response ${error}`);
    }
  );
  // Send the response
  res.write(
    `
    headers: ${JSON.stringify(req.headers)}
    `,
    (error) => {
      console.log(`error response ${error}`);
    }
  );
};

// create a server and handle requests with string response
const server = http.createServer(defaultHandler);

// listen server on port 3000
server.listen(3000, () => {
  console.log("server started on port 3000");
});

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
