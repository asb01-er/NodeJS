// Import the Express.js module
// Express is a web framework that makes it easy to handle routes and HTTP requests
const express = require("express");

// Define the port number the server will listen on
const port = 3000;

// Create an instance of an Express application
const app = express();

// ──────────────────────────────────────────────
// 🧩 MIDDLEWARE SETUP
// ──────────────────────────────────────────────

// Middleware to parse URL-encoded data (form submissions)
// Example: data sent via HTML forms (e.g., name=value)
app.use(
    express.urlencoded({
        extended: false // use classic querystring library
    })
);

// Middleware to parse incoming JSON data (useful for APIs and Postman testing)
app.use(express.json());

// Custom middleware that logs each request URL to the console
// Runs *before* every route handler
app.use((req, res, next) => {
    console.log(`Request made to: ${req.url}`); // shows the path requested
    next(); // move on to the next middleware or route
});

// ──────────────────────────────────────────────
// 🌿 GET REQUEST EXAMPLE
// ──────────────────────────────────────────────

// This route listens for GET requests like:  http://localhost:3000/item/tomato
// ":vegetable" is a route parameter (it captures whatever word comes after /item/)
app.get("/item/:vegetable", (req, res) => {
    let veg = req.params.vegetable; // access the value of the parameter
    res.send(`This is the page for ${veg}`); // respond with a dynamic message
});

// ──────────────────────────────────────────────
// 📬 POST REQUEST EXAMPLE
// ──────────────────────────────────────────────

// This route handles POST requests made to the root URL ("/")
// Useful for sending data from a form or an API client (like Postman)
app.post("/", (req, res) => {
    console.log(req.body);  // logs the data sent in the request body
    console.log(req.query); // logs any query parameters (e.g. ?key=value)
    res.send("POST Successful!"); // sends a confirmation message
});

// ──────────────────────────────────────────────
// 🚀 START THE SERVER
// ──────────────────────────────────────────────

// Start listening for incoming HTTP requests on the defined port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
