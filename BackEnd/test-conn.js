const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;
console.log("Attempting to connect to:", uri ? uri.replace(/:([^@]+)@/, ':****@') : 'undefined (MONGO_URI not set)');

mongoose.connect(uri)
  .then(() => {
    console.log("\n==================================================");
    console.log("✅ SUCCESS: Connected to MongoDB successfully!");
    console.log("==================================================");
    process.exit(0);
  })
  .catch(err => {
    console.log("\n==================================================");
    console.log("❌ FAILURE: Could not connect to MongoDB.");
    console.log("Reason:", err.message);
    console.log("Full Error details below:");
    console.log("==================================================");
    console.error(err);
    process.exit(1);
  });
