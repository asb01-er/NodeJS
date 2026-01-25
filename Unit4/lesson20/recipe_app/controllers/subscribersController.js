"use strict";

const Subscriber = require("../models/subscriber");

// Helper function to extract subscriber parameters from a request
const getSubscriberParams = (body) => {
  return {
    name: body.name,
    email: body.email,
    zipCode: parseInt(body.zipCode)
  };
};

module.exports = {
  // -------------------- INDEX -------------------- //
  index: (req, res, next) => {
    Subscriber.find()
      .then(subscribers => {
        res.locals.subscribers = subscribers; // Save subscribers for next middleware/view
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscribers: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("subscribers/index"); // Render list of subscribers
  },

  // -------------------- NEW -------------------- //
  new: (req, res) => {
    res.render("subscribers/new"); // Render form to create a new subscriber
  },

  // -------------------- CREATE -------------------- //
  create: (req, res, next) => {
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then(subscriber => {
        res.locals.redirect = "/subscribers"; // redirect after creation
        res.locals.subscriber = subscriber; // store created subscriber
        next();
      })
      .catch(error => {
        console.log(`Error saving subscriber: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    if (res.locals.redirect) res.redirect(res.locals.redirect);
    else next();
  },

  // -------------------- SHOW -------------------- //
  show: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.locals.subscriber = subscriber; // store subscriber for view
        next();
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("subscribers/show"); // Render details page
  },

  // -------------------- EDIT -------------------- //
  edit: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findById(subscriberId)
      .then(subscriber => {
        res.render("subscribers/edit", { subscriber: subscriber });
      })
      .catch(error => {
        console.log(`Error fetching subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // -------------------- UPDATE -------------------- //
  update: (req, res, next) => {
    let subscriberId = req.params.id;
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.findByIdAndUpdate(subscriberId, { $set: subscriberParams })
      .then(subscriber => {
        res.locals.redirect = `/subscribers/${subscriberId}`;
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error updating subscriber by ID: ${error.message}`);
        next(error);
      });
  },

  // -------------------- DELETE -------------------- //
  delete: (req, res, next) => {
    let subscriberId = req.params.id;
    Subscriber.findByIdAndRemove(subscriberId)
      .then(() => {
        res.locals.redirect = "/subscribers";
        next();
      })
      .catch(error => {
        console.log(`Error deleting subscriber by ID: ${error.message}`);
        next();
      });
  },

  // -------------------- SAVE FROM SIGNUP FORM -------------------- //
  saveSubscriber: (req, res, next) => {
    let subscriberParams = getSubscriberParams(req.body);
    Subscriber.create(subscriberParams)
      .then(subscriber => {
        res.locals.redirect = "/";
        res.locals.subscriber = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error saving subscriber from signup: ${error.message}`);
        next(error);
      });
  }
};
