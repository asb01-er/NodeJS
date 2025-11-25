"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

// --------------------- USER SCHEMA --------------------- //
// Defines how User documents will be structured in MongoDB.
const userSchema = new Schema(
  {
    // ---- USER NAME (NESTED OBJECT) ---- //
    // Stored as an object with first & last name keys
    name: {
      first: {
        type: String,
        trim: true // Remove spaces at beginning/end
      },
      last: {
        type: String,
        trim: true
      }
    },

    // ---- EMAIL (PRIMARY IDENTIFIER) ---- //
    email: {
      type: String,
      required: true, // Must be provided
      lowercase: true, // Always stored in lowercase
      unique: true // Prevent duplicate emails
    },

    // ---- ZIP CODE (WITH VALIDATION) ---- //
    zipCode: {
      type: Number,
      min: [1000, "Zip code too short"], // Custom validation message
      max: 99999 // Maximum value allowed
    },

    // ---- PASSWORD (REQUIRED, WILL BE HASHED) ---- //
    password: {
      type: String,
      required: true
      // Note: Password hashing should be done in middleware and NEVER stored plain
    },

    // ---- COURSES (REFERENCES MULTIPLE COURSE DOCUMENTS) ---- //
    // An array of ObjectId values pointing to Course documents
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],

    // ---- SUBSCRIBER LINK (OPTIONAL) ---- //
    // Links a User to their Subscriber account, if they have one
    subscribedAccount: {
      type: Schema.Types.ObjectId,
      ref: "Subscriber"
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// --------------------- VIRTUAL PROPERTY --------------------- //
// Combine `name.first` + `name.last` into a full name
userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

// --------------------- EXPORT MODEL --------------------- //
module.exports = mongoose.model("User", userSchema);
