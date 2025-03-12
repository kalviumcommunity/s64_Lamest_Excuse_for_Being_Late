// const mongoose = require("mongoose");

// const ExcuseSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true, // Ensure email is always included
//   },

//   user: {
//     type: String,
//     required: true,
//   },

//   title: {
//      type: String, required: true 
//     },

//   description: {
//      type: String, required: true 
//     },

//   likes: {
//      type: Number, default: 0 
//     },  // Updated from array to a number

//   dislikes: {
//      type: Number, default: 0 
//     },  // Updated from array to a number

//   comments: [
//     {
//       text: { type: String, required: true },
//       user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//       createdAt: { type: Date, default: Date.now },
//     },
//   ],
// });

// module.exports = mongoose.model("Excuse", ExcuseSchema);

// // const Excuse = mongoose.model("Excuse", ExcuseSchema);
// // module.exports = Excuse;

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
  content: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Work', 'School', 'Social', 'Personal', 'Other'],
    default: 'Other'
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