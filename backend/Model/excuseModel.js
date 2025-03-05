const mongoose = require("mongoose");

const ExcuseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: Number, default: 0 },  // Updated from array to a number
  dislikes: { type: Number, default: 0 },  // Updated from array to a number
  comments: [
    {
      text: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Excuse", ExcuseSchema);

// const Excuse = mongoose.model("Excuse", ExcuseSchema);
// module.exports = Excuse;