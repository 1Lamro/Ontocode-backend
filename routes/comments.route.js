const { Router } = require("express");
const { commentController } = require("../controllers/comments.controller");

const router = Router();

router.post("/comment", commentController.addComment);
router.delete("/comment/:id", commentController.deleteCommentById);
router.get("/comment", commentController.getComment);
router.patch("/comment/:id", commentController.updateCommentById);


module.exports = router