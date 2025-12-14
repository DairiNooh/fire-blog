const mongoose = require('mongoose');

// we need mongoose schema
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
// then we register the model with mongoose
const Post = mongoose.model('Post', postSchema);

// export the model
module.exports = Post;
