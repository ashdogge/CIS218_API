const mongoose = require("mongoose");

// Mongoose schema to track record ID
const trackerSchema = new mongoose.Schema({
  _id: { type: String, required: true }, 
  seq: { type: Number, default: 0 },
});

module.exports = mongoose.model("IdTracker", trackerSchema);
