const mongoose = require('mongoose');

// we need mongoose schema
const likesSchema = mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },

  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
// then we register the model with mongoose
const Like = mongoose.model('Like', likesSchema);

// export the model
module.exports = Like;
