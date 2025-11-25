"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const Subscriber = require("./models/subscriber");
const methodOverride = require("method-override"); // Import method-override to handle PUT and DELETE from forms

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

// -------------------- MIDDLEWARE -------------------- //
router.use(express.static("public"));
router.use(layouts);
router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(express.json());
router.use(methodOverride("_method", { // Enable PUT/DELETE via query parameter _method
  methods: ["POST", "GET"]
}));

router.use(homeController.logRequestPaths);

router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

// -------------------- USER ROUTES -------------------- //
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit); // Render edit form for user
router.put("/users/:id/update", usersController.update, usersController.redirectView); // Update user data
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView); // Delete user

// -------------------- SUBSCRIBER ROUTES -------------------- //
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit); // Render edit form for subscriber
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);

// -------------------- COURSE ROUTES -------------------- //
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.get("/courses/:id/edit", coursesController.edit); // Render edit form for course
router.put("/courses/:id/update", coursesController.update, coursesController.redirectView); // Update course
router.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView); // Delete course

router.post("/subscribe", subscribersController.saveSubscriber); // Handle subscription form

// -------------------- ERROR ROUTES -------------------- //
router.use(errorController.logErrors); // Log server errors
router.use(errorController.respondNoResourceFound); // Handle 404
router.use(errorController.respondInternalError); // Handle 500

app.use("/", router); // Mount the router at root path

// -------------------- START SERVER -------------------- //
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
