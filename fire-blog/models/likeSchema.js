const mongoose = require('mongoose');

// we need mongoose schema
const likesSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// export the model
module.exports = likesSchema;
