"use strict";

const port = 3000;
const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const httpStatus = require("http-status-codes");

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000 )

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

app.get("/name", homeController.respondWithName);

app.get("/name/:myName", homeController.respondWithName);

app.use(errorController.respondNoResourceFound);

app.use(errorController.respondInternalError);

app.use(express.static("public"));

app.listen(app.get("port"), () => {
    console.log(`Server running on port: ${app.get("port")}`)
});

