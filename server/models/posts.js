const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  postedBy: {
    type: String,
    ref: 'User'
  },
  likes: {
    type: Number,
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
