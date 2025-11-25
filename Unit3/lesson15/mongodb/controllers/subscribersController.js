const Subscriber = require("../models/subscriber"); // Import Subscriber model

// -------------------- GET ALL SUBSCRIBERS -------------------- //
// Fetch all subscribers from the database and render them on a view
exports.getAllSubscribers = (req, res) => {
  Subscriber.find({})
    .exec() // Execute the query
    .then((subscribers) => {
      res.render("subscribers", {
        subscribers: subscribers // Pass data to the EJS view
      });
    })
    .catch((error) => {
      console.log(error.message); // Log the error on the server
      return []; // Return an empty result to avoid breaking the app
    })
    .then(() => {
      console.log("Promise completed"); // Final message after the process
    });
};

// -------------------- LOAD SUBSCRIPTION FORM PAGE -------------------- //
// Render "contact.ejs", which contains the subscription form
exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

// -------------------- SAVE SUBSCRIBER TO DATABASE -------------------- //
// Create a new Subscriber from form data and save it
exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });

  // Save to database
  newSubscriber.save((error, result) => {
    if (error) {
      // If saving fails, notify the client and stop execution
      return res.send(error);
    }
    // If successful, render a "thank you" page
    res.render("thanks");
  });
};
