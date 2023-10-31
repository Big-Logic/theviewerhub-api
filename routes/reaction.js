const express = require("express");
const authController = require("./../controllers/authController");
const reactionsController = require("./../controllers/reactionsController");

const router = express.Router();

router.use(authController.routeProtectorForLogin);

router
  .route("/:id")
  .get(reactionsController.getOneReaction)
  .patch(
    reactionsController.bodyExtractionMiddlewareUpdate,
    reactionsController.updateReaction
  )
  .delete(reactionsController.deleteReaction);

router
  .route("/")
  .get(reactionsController.getAllReactions)
  .post(
    reactionsController.bodyExtractionMiddlewareCreate,
    reactionsController.createReaction
  );

module.exports = router;
