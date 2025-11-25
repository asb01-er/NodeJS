const Subscriber = require("../models/subscriber"); // Import Subscriber model

// -------------------- GET ALL SUBSCRIBERS -------------------- //
// Query the database for all subscriber records and display them in a view
exports.getAllSubscribers = (req, res) => {
  Subscriber.find({})
    .exec() // Execute the query
    .then((subscribers) => {
      // Render subscribers.ejs and pass the list of subscribers
      res.render("subscribers", {
        subscribers: subscribers
      });
    })
    .catch((error) => {
      // If query fails, log the error but do not break app
      console.log(error.message);
      return [];
    })
    .then(() => {
      // Runs after success or failure
      console.log("Promise Complete");
    });
};

// -------------------- LOAD SUBSCRIPTION PAGE -------------------- //
// Render contact.ejs which contains the subscription form
exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

// -------------------- SAVE NEW SUBSCRIBER -------------------- //
// Create a new subscriber based on submitted form data and save it to the database
exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,    // Value sent from form input 'name'
    email: req.body.email,  // Value sent from form input 'email'
    zipCode: req.body.zipCode // Value sent from form input 'zipCode'
  });

  newSubscriber
    .save() // Save to the database
    .then(() => {
      // If successful, show a thank you page
      res.render("thanks");
    })
    .catch((error) => {
      // If saving fails, return error to user
      res.send(error);
    });
};
