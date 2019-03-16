const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: { type: String},
  body: { type: String},
  date: { type: Date, default: Date.now },
  postId: {type: String}
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;