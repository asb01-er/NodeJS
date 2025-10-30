"use strict";

// Import the cities package to look up ZIP code info
const cities = require("cities");

// Use the zip_lookup method to find location details for ZIP code 10016
var myCity = cities.zip_lookup("10016");

// Print the result to the console
console.log(myCity);