const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const commentController = require("../controllers/commentsController");

router.use(authController.routeProtectorForLogin);

router.get("/count", commentController.countComments);

router
  .route("/:id")
  .get(commentController.getComment)
  .delete(commentController.deleteComment)
  .patch(commentController.updateComment);

router
  .route("/")
  .get(commentController.getAllComments)
  .post(commentController.fixAddCommentBody, commentController.createComment);

module.exports = router;
