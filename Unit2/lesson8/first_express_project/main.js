"use stript";
// Import the Express.js library
// Express simplifies handling HTTP requests and building web servers
const express = require("express");

// Define the port number where the server will run
const port = 3000;

// Create an Express application instance
const app = express();

// Define a GET route for the root URL ("/")
app
    .get("/", (req, res) => {
        // Log different parts of the incoming request to the console

        console.log(req.params); // Route parameters (e.g., /user/:id → req.params.id)
        console.log(req.body);   // Request body (used in POST/PUT requests — will be undefined unless a body parser is used)
        console.log(req.url);    // The actual URL requested by the client
        console.log(req.query);  // Query string parameters (e.g., ?name=Ernest → req.query.name)

        // Send a response back to the client’s browser
        res.send("Hello, Universe!");
    })

    // Start the server and make it listen for requests on the defined port
    .listen(port, () => {
        // This message will appear in the terminal once the server starts successfully
        console.log(`The Express.js server has started and is listening on port number: ${port}`);
    });
