const mongoose = require("mongoose");

const ExcuseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who disliked
  comments: [
    {
      text: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});


module.exports = mongoose.model("Excuse", ExcuseSchema);

// const Excuse = mongoose.model("Excuse", ExcuseSchema);
// module.exports = Excuse;