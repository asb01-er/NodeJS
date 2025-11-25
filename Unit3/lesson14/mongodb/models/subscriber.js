const mongoose = require('mongoose');

// -------------------- CREATE SUBSCRIBER SCHEMA -------------------- //
// A schema defines the structure of documents in a MongoDB collection
const subscriberSchema = mongoose.Schema({
  
  // Schema properties (fields in the collection)
  name: String,     // Subscriber's full name
  email: String,    // Email address (unique identifier in many cases)
  zipCode: Number   // Postal/ZIP code
});

// -------------------- EXPORT MODEL -------------------- //
// Create a model named "Subscriber" based on the schema
// This model will represent the "subscribers" collection in MongoDB
module.exports = mongoose.model("Subscriber", subscriberSchema);
