"use strict";

exports.respondWithName = (req, res) => {
    let paramsName = req.params.myName; 
    res.render("index", {name: paramsName});
};


// exports.respondWithName = (req, res) => {
//     const name = req.params.myName;
//     res.send(`Hello, ${name}!`);
// };