"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;
const Subscriber = require("./subscriber"); // Import Subscriber model to link user accounts

const userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        trim: true
      },
      last: {
        type: String,
        trim: true
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      min: [1000, "Zip code too short"],
      max: 99999
    },
    password: {
      type: String,
      required: true
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }], // Reference multiple courses
    subscribedAccount: {
      type: Schema.Types.ObjectId,
      ref: "Subscriber" // Link to a Subscriber account
    }
  },
  {
    timestamps: true // Automatically add createdAt and updatedAt fields
  }
);

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`; // Virtual field combining first & last names
});

// -------------------- PRE-SAVE HOOK -------------------- //
// Automatically link a User to their Subscriber account by email before saving
userSchema.pre("save", function (next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email // Find subscriber with same email
    })
      .then(subscriber => {
        user.subscribedAccount = subscriber; // Link the subscriber
        next(); // Proceed with saving
      })
      .catch(error => {
        console.log(`Error in connecting subscriber: ${error.message}`); // Log errors
        next(error); // Pass error to middleware
      });
  } else {
    next(); // If already linked, continue saving
  }
});

module.exports = mongoose.model("User", userSchema); // Export the User model
