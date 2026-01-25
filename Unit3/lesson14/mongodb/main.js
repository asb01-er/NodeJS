"use strict"; 

// -------------------- APP SETUP -------------------- //
const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");

// Import controllers
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

// Import Mongoose model
const Subscriber = require("./models/subscriber");

// -------------------- DATABASE SETUP -------------------- //
// Require Mongoose
const mongoose = require("mongoose");

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true
});

// Access the database connection
const db = mongoose.connection;

// Log when connection is successful
db.once("open", () => {
  console.log("Successfully connected to MongoDB");
});

// -------------------- DATABASE EXAMPLES -------------------- //
// Option 1: Create a new Subscriber instance, then save it
const subscriber1 = new Subscriber({
  name: "Ernest Ekelem",
  email: "jon@jonwexler.com"
});

subscriber1
  .save()
  .then(savedDocument => {
    console.log("Saved subscriber:", savedDocument);
  })
  .catch(error => {
    console.error("Error saving subscriber:", error);
  });

// Option 2: Create and save directly using `create()`
Subscriber.create({
  name: "Edward Ekelem",
  email: "jon@jonwexler.com"
})
  .then(savedDocument => {
    console.log("Created subscriber:", savedDocument);
  })
  .catch(error => {
    console.error("Error creating subscriber:", error);
  });

// -------------------- SERVER CONFIG -------------------- //
app.set("port", process.env.PORT || 3000); // Default port 3000 if not set in environment
app.set("view engine", "ejs"); // Use EJS templating engine

app.use(layouts); // Enable EJS layouts

// Middleware for handling form data
app.use(
  express.urlencoded({
    extended: false
  })
);
// Middleware for handling JSON requests
app.use(express.json());

// Custom middleware to log every request URL
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next(); // Proceed to the next middleware/route
});

// -------------------- ROUTES -------------------- //
// Route with URL parameter (e.g., /items/carrot)
app.get("/items/:vegetable", homeController.sendReqParam);

// Handle POST request on root route
app.post("/", homeController.sendPost);

// Route with name parameter (e.g., /name/John)
app.get("/name/:myName", homeController.respondWithName);

// -------------------- ERROR HANDLING MIDDLEWARE -------------------- //
// Custom 404 (resource not found) handler
app.use(errorController.respondNoResourceFound);

// Custom 500 (internal server) error handler
app.use(errorController.respondInternalError);

// -------------------- START SERVER -------------------- //
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
