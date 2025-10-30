"use strict";

const http = require("http"); // Built-in module to create web servers
const httpStatus = require("http-status-codes"); // Package for readable status codes

const port = 3000; // Port number for the server

// Create the server and define how it responds to requests
const app = http.createServer((req, res) => {
  console.log("Received request"); // Log each incoming request

  // Set response header with status code and content type
  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });

  // Send a simple HTML message to the browser
  res.write("<h1>Hello, Ernest!</h1>");
  res.end(); // End the response
});


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`The server has started and is listening on port ${port}`);
});
