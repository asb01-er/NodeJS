"use strict";

// Import the messages module
const messageModule = require("./messages");

// Loop through each message and print it to the console
messageModule.messages.forEach(m => console.log(m));
