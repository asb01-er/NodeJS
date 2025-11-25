"use strict";

const express = require("express");
const app = express();
const router = express.Router(); // Create a router instance to define modular routes
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const Subscriber = require("./models/subscriber");

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://0.0.0.0:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(express.static("public")); // Serve static assets (CSS, JS, images) from /public
router.use(layouts); // Apply EJS layouts to all views
router.use(
  express.urlencoded({
    extended: false
  })
); // Parse URL-encoded form data
router.use(express.json()); // Parse JSON request bodies
router.use(homeController.logRequestPaths); // Log every request URL

router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

//user routes
router.get("/users", usersController.index, usersController.indexView); // List all users
router.get("/users/new", usersController.new); // Form to create new user
router.post("/users/create", usersController.create, usersController.redirectView); // Save new user and redirect
router.get("/users/:id", usersController.show, usersController.showView); // Show single user details

//subscriber routes
router.get("/subscribers", subscribersController.index, subscribersController.indexView); // List all subscribers
router.get("/subscribers/new", subscribersController.new); // Form to create new subscriber
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
); // Save subscriber and redirect
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView); // Show single subscriber details

//course routes
router.get("/courses", coursesController.index, coursesController.indexView); // List all courses
router.get("/courses/new", coursesController.new); // Form to create new course
router.post("/courses/create", coursesController.create, coursesController.redirectView); // Save new course and redirect
router.get("/courses/:id", coursesController.show, coursesController.showView); // Show single course details

router.post("/subscribe", subscribersController.saveSubscriber); // Handle subscription form submissions

//error routes
router.use(errorController.logErrors); // Log errors to console
router.use(errorController.respondNoResourceFound); // Handle 404
router.use(errorController.respondInternalError); // Handle 500

app.use("/", router); // Mount the router on the root path

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
