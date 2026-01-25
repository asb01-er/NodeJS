"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// -------------------- CONTROLLERS -------------------- //
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");

// -------------------- DATABASE -------------------- //
mongoose.connect("mongodb://0.0.0.0:27017/confetti_cuisine", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// -------------------- APP CONFIG -------------------- //
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// -------------------- GLOBAL MIDDLEWARE -------------------- //
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method")); // for PUT/DELETE forms

// -------------------- HOME ROUTES -------------------- //
router.get("/", homeController.index);
router.get("/courses", homeController.showCourses);
router.get("/contact", homeController.showSignUp);
router.post("/contact", homeController.postedSignUpForm);

// -------------------- SUBSCRIBER ROUTES -------------------- //
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);
router.post("/subscribe", subscribersController.saveSubscriber); // subscription form

// -------------------- USER ROUTES -------------------- //
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

// -------------------- ERROR HANDLING -------------------- //
const errorController = require("./controllers/errorController");
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

// -------------------- MOUNT ROUTER -------------------- //
app.use("/", router);

// -------------------- START SERVER -------------------- //
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
