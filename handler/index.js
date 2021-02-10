const querystring = require("querystring");
const StringDecoder = require("string_decoder").StringDecoder;

const defaultHandler = (req, res) => {
  // Get the path
  const [url, ...rest] = req.url.split("?");
  const trimmedPath = url.replace(/^\/+|\/+$/g, "");

  // Send the status code
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);

  // Send the response
  res.write(
    `
      path: '${trimmedPath}'
      `,
    (error) => {
      console.log(`error response ${error}`);
    }
  );

  // Get the HTTP method
  const method = req.method.toLowerCase();

  // Send the response
  res.write(
    `
      method: '${method}'
      `,
    (error) => {
      console.log(`error response ${error}`);
    }
  );

  // Get the query string as an object
  let queryStringObj = {};
  if (rest && rest.length > 0) {
    const [queryStr] = rest;
    queryStringObj = querystring.parse(queryStr, null, null);
  }

  // Send the response
  res.write(
    `
      queryStringObj: ${JSON.stringify(queryStringObj)}
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
  /* 
  // Send the response
  res.write(
    `
      env: ${JSON.stringify(process.env)}
      `,
    (error) => {
      console.log(`error response ${error}`);
    }
  ); */

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
        console.log("ending response");
      }
    );
  });
};

module.exports = { defaultHandler };
