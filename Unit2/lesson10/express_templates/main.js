"use strict"; 
// Enforces modern JavaScript rules (prevents sloppy coding practices)

// ──────────────────────────────────────────────
// ⚙️ BASIC SETUP
// ──────────────────────────────────────────────

const express = require("express");   // Import the Express.js library
const app = express();                // Create an Express application instance
const homeController = require("./controllers/homeController"); 
const layouts = require("express-ejs-layouts");
// Import the controller that will handle route logic (your custom module)

const port = 3000; // Default port number (only used as a fallback)

// ──────────────────────────────────────────────
// 🎨 VIEW ENGINE CONFIGURATION
// ──────────────────────────────────────────────

// Tell Express to use EJS as the templating engine
// EJS allows you to generate HTML dynamically with embedded JS
app.set("view engine", "ejs");

// Define the port using an environment variable if available
// Otherwise, default to 3000
app.set("port", process.env.PORT || port);

app.use(layouts);

// ──────────────────────────────────────────────
// 🧩 MIDDLEWARE CONFIGURATION
// ──────────────────────────────────────────────

// Parse incoming data from HTML forms (URL-encoded)
// app.use(
//     express.urlencoded({
//         extended: false // use classic querystring library instead of qs
//     })
// );

// Parse incoming JSON data (useful for API requests)
// app.use(express.json());

// ──────────────────────────────────────────────
// 🧭 ROUTES
// ──────────────────────────────────────────────

// When someone visits: http://localhost:3000/name
// or sends a GET request to that path,
// this route calls a controller function to handle the response
// app.get("/name", homeController.respondWithName);

// Same route but with a dynamic segment (e.g., /name/Ernest)
// ":myName" is a route parameter that can be accessed in the controller
app.get("/name/:myName", homeController.respondWithName);

// ──────────────────────────────────────────────
// 🚀 START SERVER
// ──────────────────────────────────────────────

// Start the Express server and listen for incoming requests
app.listen(app.get("port"), () => {
    console.log(`Server running on port: ${app.get("port")}`);
});
