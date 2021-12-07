const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  mainPost: {
    type: String,
    required: true,
  },
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

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
