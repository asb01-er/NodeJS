"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  coursesController = require("./controllers/coursesController"),
  Subscriber = require("./models/subscriber");
mongoose.Promise = global.Promise; // Use native JS promises instead of Mongoose's deprecated ones

mongoose.connect(
  "mongodb://0.0.0.0:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true); // Avoid index creation deprecation warning

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public")); // Serve static assets (CSS, images, JS) from /public folder
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/", homeController.index);
app.get("/contact", homeController.getSubscriptionPage);

app.get("/users", usersController.index, usersController.indexView); // First fetch users, then render the view
app.get("/subscribers", subscribersController.index, subscribersController.indexView); // Same 2-step middleware pattern
app.get("/courses", coursesController.index, coursesController.indexView); // For Courses as well

app.post("/subscribe", subscribersController.saveSubscriber);

app.use(errorController.logErrors); // Log server errors to console
app.use(errorController.respondNoResourceFound); // Custom 404 handler
app.use(errorController.respondInternalError); // Custom 500 handler

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
