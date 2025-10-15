"use strict";

const port = 3000;
const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000 )

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

app.get("/name", homeController.respondWithName)

app.listen(app.get("port"), () => {
    console.log(`Server running on port: ${app.get("port")}`)
});

