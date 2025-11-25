"use strict";

// ------------------------------------------------------------
// Home / General Page Controller
// Defines actions used to render basic pages and log requests
// ------------------------------------------------------------

module.exports = {
  // -------------------- CONTACT / SUBSCRIPTION PAGE -------------------- //
  // Renders the contact.ejs page which contains the subscription form
  getSubscriptionPage: (req, res) => {
    res.render("contact");
  },

  // -------------------- HOME PAGE -------------------- //
  // Renders the index.ejs (homepage)
  index: (req, res) => {
    res.render("index");
  },

  // -------------------- REQUEST LOGGER MIDDLEWARE -------------------- //
  // Logs every incoming request URL for debugging and traffic monitoring
  logRequestPaths: (req, res, next) => {
    console.log(`Request made to: ${req.url}`);
    next(); // Allow the request to continue to the next middleware
  }
};
