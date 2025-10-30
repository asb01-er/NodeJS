"use strict";

// Set the port number for the server
const port = 3000;

// Import required modules
const http = require("http"); // Core Node.js module to create servers
const httpStatusCodes = require("http-status-codes"); // Provides readable HTTP status codes
const fs = require("fs"); // File system module to read files
const router = require("./router"); // Custom router module to handle routes

// Define content types for responses
const plainTextContentType = {
  "Content-Type": "text/plain" // Used for plain text responses
};

const htmlContentType = {
  "Content-Type": "text/html" // Used for HTML responses
};

// Custom function to read and serve a file
const customReadFile = (file, res) => {
  fs.readFile(`./${file}`, (errors, data) => {
    if (errors) {
      console.log("Error reading the file..."); // Log if file read fails
    }
    res.end(data); // Send file content as response
  });
};

// Handle GET request to root URL "/"
router.get("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType); // Set status and content type
  res.end("INDEX"); // Send plain text response
});

// Handle GET request to "/index.html"
router.get("/index.html", (req, res) => {
  res.writeHead(httpStatusCodes.OK, htmlContentType); // Set status and content type
  customReadFile("views/index.html", res); // Serve the HTML file
});

// Handle POST request to root URL "/"
router.post("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType); // Set status and content type
  res.end("POSTED"); // Send confirmation message
});

// Create and start the server using the router's handle method
http.createServer(router.handle).listen(port);

// Log a message to confirm the server is running
console.log(`The server is listening on port number: ${port}`);