"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const subscribersController = require("./controllers/subscribersController");

// -------------------- DATABASE -------------------- //
mongoose.connect("mongodb://0.0.0.0:27017/confetti_cuisine", {
  useNewUrlParser: true
});

mongoose.connection.once("open", () => {
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
app.use(methodOverride("_method"));

// -------------------- ROUTER MIDDLEWARE -------------------- //
router.use(homeController.logRequestPaths);

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

router.post("/subscribe", subscribersController.saveSubscriber);

// -------------------- ERROR HANDLING -------------------- //
router.use(errorController.respondNoResourceFound);
router.use(errorController.respondInternalError);

// -------------------- MOUNT ROUTER -------------------- //
app.use("/", router);

// -------------------- START SERVER -------------------- //
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
