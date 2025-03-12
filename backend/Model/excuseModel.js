const mongoose = require("mongoose");

// Comment schema (sub-document)
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Main Excuse schema
const excuseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // Reference to the User model
  }],
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp on save
excuseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Excuse = mongoose.model("Excuse", excuseSchema);

module.exports = Excuse;