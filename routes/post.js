const express = require("express");
const authController = require("./../controllers/authController");
const postController = require("./../controllers/postController");

const router = express.Router();

router.use(authController.routeProtectorForLogin);

router
  .route("/:id")
  .get(postController.getOnePost)
  .patch(
    postController.bodyExtractionMiddlewareUpdate,
    postController.updatePost
  )
  .delete(postController.deletePost);

router
  .route("/")
  .get(postController.getAllPosts)
  .post(
    postController.bodyExtractionMiddlewareCreate,
    postController.createPost
  );

module.exports = router;
