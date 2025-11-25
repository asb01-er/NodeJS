"use strict";

// -------------------- APP SETUP -------------------- //
const express = require("express");
const app = express();

const layouts = require("express-ejs-layouts");

// Import controllers
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");

// Import Mongoose and model
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

// -------------------- DATABASE CONNECTION -------------------- //
// Connect to local MongoDB database named "recipe_db"
mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true
});

// Log successful connection
mongoose.connection.once("open", () => {
  console.log("Successfully connected to MongoDB");
});

// -------------------- SERVER CONFIGURATION -------------------- //
app.set("port", process.env.PORT || 3000); // Default port is 3000
app.set("view engine", "ejs"); // Use EJS template engine

// EJS Layout middleware
app.use(layouts);

// Handle form submissions and JSON
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

// Log every request for debugging
app.use((req, res, next) => {
  console.log(`Request made to: ${req.url}`);
  next();
});

// -------------------- ROUTES -------------------- //

// Fetch all subscribers (browser route + send data as fallback)
app.get(
  "/subscribers",
  subscribersController.getAllSubscribers,
  (req, res, next) => {
    console.log(req.data); // Show fetched data in console
    res.send(req.data); // Optional API response
  }
);

// Subscription form page
app.get("/contact", subscribersController.getSubscriptionPage);

// Handle new subscription form submission
app.post("/subscribe", subscribersController.saveSubscriber);

// -------------------- ERROR HANDLING -------------------- //
// Custom 404 page (resource not found)
app.use(errorController.respondNoResourceFound);

// Custom 500 error handler (server crash)
app.use(errorController.respondInternalError);

// -------------------- START SERVER -------------------- //
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
