"use strict";

const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  { useNewURLParser: true }
);

const db = mongoose.connection;

var subscriber1 = new Subscriber({
  name: "Ernest Ekelem",
  email: "jon@jonwexler.com"
});
subscriber1.save((error, savedDocument) => {
  if (error) console.log(error);
  console.log(savedDocument);
});

Subscriber.create(
  {
    name: "Ernest Ekelem",
    email: "jon@jonwexler.com"
  },
  function (error, savedDocument) {
    if (error) console.log(error);
    console.log(savedDocument);
  }
);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", homeController.sendPost);

app.get("/name/:myName", homeController.respondWithName);

//error handling middleware
// app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});

