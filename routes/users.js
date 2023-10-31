const express = require("express");

const router = express.Router();

const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");

router.use(authController.routeProtectorForLogin);

router.get("/logineduser", usersController.getLoginUser);
router
  .route("/:id")
  .get(usersController.getUser)
  .delete(usersController.deleteUser, authController.logout);

router
  .route("/")
  .get(authController.routeProtcetorForAdmin, usersController.getAllUsers)
  .patch(usersController.updateUser);

module.exports = router;
