const { Router } = require("express");
const { commentController } = require("../controllers/comments.controller");
const { checkAuth } = require("../models/middlewares/auth.middleware")


const router = Router();

router.post("/comment", checkAuth, commentController.addComment);
router.delete("/comment/:id", checkAuth, commentController.deleteCommentById);
router.get("/comment", commentController.getComment);
router.patch("/comment/:id", commentController.updateCommentById);


module.exports = router