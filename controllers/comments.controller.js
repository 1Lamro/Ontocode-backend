const Comment = require("../models/Comment.model");

module.exports.commentController = {
  addComment: async (req, res) => {
    try {
      const data = await Comment.create({
        user: req.body.user,
        task: req.body.task,
        text: req.body.text,
      });
      const comment = await Comment.find({ _id: data._id }).populate("user");
      res.json(comment);
    } catch (err) {
      res.json(err);
    }
  },
  getComment: async (req, res) => {
    try {
      const data = await Comment.find().populate("user");
      res.json(data);
    } catch (error) {
      res.json(error.message);
    }
  },

  deleteCommentById: async (req, res) => {
    try {
      const deleteComment = await Comment.findByIdAndRemove(req.params.id);
      res.json(deleteComment);
    } catch (err) {
      res.json(err);
    }
  },
  updateCommentById: async (req, res) => {
    try {
      const updateComment = await Comment.findByIdAndUpdate(req.params.id, {
        user: req.body.user,
        task: req.body.task,
        text: req.body.text,
      });
      res.json(updateComment);
    } catch (err) {
      req.json(err);
    }
  },
};
