const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  task: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Task",
  },
  text: String,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
