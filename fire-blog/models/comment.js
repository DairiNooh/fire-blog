const mongoose = require('mongoose');
const likesSchema = require('./likeSchema');

// we need mongoose schema
const commentSchema = mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  likes: [likesSchema],
});
// then we register the model with mongoose
const Comment = mongoose.model('Comment', commentSchema);

// export the model
module.exports = Comment;
