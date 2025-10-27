"use strict";

const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const layouts = require("express-ejs-layouts");

const MongoDB = require("mongodb").MongoClient;
const dbURL = "mongo://localhost:27017";
const dbName = "recipe_db";

MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error;
  let db = client.db(dbName);
  db.collection("contacts")
  .insert({
    name: "Ernest Ekelem",
    email: "ernest@gmail.com"
  }, (error, db) => {
    if (error) throw error;
    console.log(db);
  });

  db.collection("contacts")
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    });
});

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

