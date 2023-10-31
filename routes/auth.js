const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

router
  .route("/signup")
  .post(
    authController.checkEmailExistance,
    authController.checkPasswords,
    authController.signup
  );
router.route("/login").post(authController.login);
router
  .route("/logout")
  .post(authController.routeProtectorForLogin, authController.logout);

module.exports = router;
