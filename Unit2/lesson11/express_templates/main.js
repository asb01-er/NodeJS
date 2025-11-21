"use strict";
// Enforces strict mode — helps catch common mistakes and enforces cleaner JavaScript

// ──────────────────────────────────────────────
// ⚙️ BASIC APP SETUP
// ──────────────────────────────────────────────
const express = require("express"); // Import Express.js
const app = express();              // Create an instance of an Express application
const port = 3000;                  // Default port number

// Import controller modules
// Each controller contains specific logic for handling routes or errors
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

const layouts = require("express-ejs-layouts");

// Import the http-status-codes package for standardized HTTP status constants (e.g., 404, 500)


// ──────────────────────────────────────────────
// 🎨 VIEW ENGINE CONFIGURATION
// ──────────────────────────────────────────────

// Use EJS as the templating/view engine (renders dynamic HTML)
app.set("view engine", "ejs");

// Set the port to use either an environment variable (for deployment) or default to 3000
app.set("port", process.env.PORT || port);

app.use(layouts);

// ──────────────────────────────────────────────
// 🧩 MIDDLEWARE CONFIGURATION
// ──────────────────────────────────────────────

// Parse URL-encoded data from forms (like `application/x-www-form-urlencoded`)
app.use(
    express.urlencoded({
        extended: false // Use the built-in querystring library
    })
);

// Parse JSON data from requests (used for APIs or AJAX requests)
app.use(express.json());

// ──────────────────────────────────────────────
// 🧭 ROUTES
// ──────────────────────────────────────────────

// Route 1: Handles GET requests to /name
// Example: http://localhost:3000/name
app.get("/name", homeController.respondWithName);

// Route 2: Handles GET requests with a dynamic URL parameter
// Example: http://localhost:3000/name/Ernest
// In the controller, you can access it via req.params.myName
app.get("/name/:myName", homeController.respondWithName);

// ──────────────────────────────────────────────
// 📂 STATIC FILES
// ──────────────────────────────────────────────
// Serves static files (like images, CSS, JS) from the "public" directory
// Example: /public/styles.css → accessible at http://localhost:3000/styles.css
app.use(express.static("public"));

// ──────────────────────────────────────────────
// ⚠️ ERROR HANDLING MIDDLEWARE
// ──────────────────────────────────────────────

// Handles 404 errors — when no route matches the requested URL
// This must come *after* all other route definitions
app.use(errorController.respondNoResourceFound);

// Handles internal server errors (500)
// This catches thrown errors and sends an appropriate response
app.use(errorController.respondInternalError);



// ──────────────────────────────────────────────
// 🚀 START THE SERVER
// ──────────────────────────────────────────────

// Starts the Express server on the configured port
app.listen(app.get("port"), () => {
    console.log(`Server running on port: ${app.get("port")}`);
});
