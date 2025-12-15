const mongoose = require('mongoose');
const likeSchema = require('./likeSchema');

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

  likes: [likeSchema],
});
// then we register the model with mongoose
const Post = mongoose.model('Post', postSchema);

// export the model
module.exports = Post;
