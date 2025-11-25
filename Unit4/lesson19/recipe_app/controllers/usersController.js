"use strict";

const User = require("../models/user");

module.exports = {
  index: (req, res, next) => {
    User.find() // Fetch all users from the database
      .then(users => {
        res.locals.users = users; // Store users in res.locals for later middleware/view
        next(); // Proceed to next middleware (indexView)
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`); // Log fetch errors
        next(error); // Pass error to error handling middleware
      });
  },

  indexView: (req, res) => {
    res.render("users/index"); // Render the view that lists all users
  },

  new: (req, res) => {
    res.render("users/new"); // Render the form to create a new user
  },

  create: (req, res, next) => {
    let userParams = {
      name: {
        first: req.body.first, // Get first name from form
        last: req.body.last    // Get last name from form
      },
      email: req.body.email,     // Email from form input
      password: req.body.password, // Password from form input (should be hashed later)
      zipCode: req.body.zipCode  // Zip code from form
    };

    User.create(userParams) // Save new user to database
      .then(user => {
        res.locals.redirect = "/users"; // Set redirect path after creation
        res.locals.user = user;          // Store newly created user for use in middleware
        next();                          // Proceed to redirectView
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`); // Log creation errors
        next(error); // Pass error to error handling middleware
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect; // Check if redirect path is set
    if (redirectPath) res.redirect(redirectPath); // Redirect if path exists
    else next(); // Otherwise, continue
  },

  show: (req, res, next) => {
    let userId = req.params.id; // Get user ID from URL
    User.findById(userId)       // Fetch single user by ID
      .then(user => {
        res.locals.user = user; // Store user in res.locals for the next middleware/view
        next();                 // Proceed to showView
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`); // Log fetch error
        next(error); // Pass error to error handling middleware
      });
  },

  showView: (req, res) => {
    res.render("users/show"); // Render view to display single user details
  }
};
