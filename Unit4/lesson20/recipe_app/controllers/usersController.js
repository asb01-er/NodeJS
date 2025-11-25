"use strict";

const User = require("../models/user");

module.exports = {
  index: (req, res, next) => {
    User.find() // Fetch all users
      .then(users => {
        res.locals.users = users; // Store users in res.locals for later middleware/view
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("users/index"); // Render page listing all users
  },

  new: (req, res) => {
    res.render("users/new"); // Render form to create a new user
  },

  create: (req, res, next) => {
    let userParams = {
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    };

    User.create(userParams) // Save new user
      .then(user => {
        res.locals.redirect = "/users"; // Set redirect path after creation
        res.locals.user = user; // Store created user in res.locals
        next();
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect; // Check for redirect path
    if (redirectPath) res.redirect(redirectPath); // Redirect if path exists
    else next(); // Otherwise, continue
  },

  show: (req, res, next) => {
    let userId = req.params.id; // Get user ID from URL
    User.findById(userId) // Fetch single user by ID
      .then(user => {
        res.locals.user = user; // Store user for next middleware/view
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("users/show"); // Render page for a single user's details
  },

  // -------------------- EDIT USER -------------------- //
  edit: (req, res, next) => {
    let userId = req.params.id; // Get user ID from URL
    User.findById(userId) // Fetch user to edit
      .then(user => {
        res.render("users/edit", { user: user }); // Render edit form with user data
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  // -------------------- UPDATE USER -------------------- //
  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = {
        name: {
          first: req.body.first,
          last: req.body.last
        },
        email: req.body.email,
        password: req.body.password,
        zipCode: req.body.zipCode
      };

    User.findByIdAndUpdate(userId, { $set: userParams }) // Update user in DB
      .then(user => {
        res.locals.redirect = `/users/${userId}`; // Redirect to the updated user's page
        res.locals.user = user; // Store updated user
        next();
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },

  // -------------------- DELETE USER -------------------- //
  delete: (req, res, next) => {
    let userId = req.params.id; // Get user ID from URL
    User.findByIdAndRemove(userId) // Delete user from DB
      .then(() => {
        res.locals.redirect = "/users"; // Redirect to users list after deletion
        next();
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  }
};
