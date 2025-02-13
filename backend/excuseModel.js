const mongoose = require("mongoose");

const ExcuseSchema = new mongoose.Schema({

    name: { 
        type: String,
        required: true },
        
    description: {
         type: String,
          required: true
         }
});

module.exports = mongoose.model("Excuse", ExcuseSchema);