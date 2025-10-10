"use strict";

const http = require("http");
const httpStatus = require("http-status-codes");

const port = 3000;

const app = http.createServer((request, response) => {
  console.log("Received an incoming request!");
  response.writeHead(httpStatus.StatusCodes.OK, {
    "Content-Type": "text/html",
  });
  response.write("<h1>Hello, World!</h1>");
  response.end();
});

app.listen(port, () => {
  console.log(`The server has started and is listening on port ${port}`);
});
