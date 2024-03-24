const express = require("express");
const {
  CreateUser,
  LoginUser,
  userIsAuthicated,
} = require("../../contollers/user/UserController");
const { userAuth } = require("../../contollers/user/UserAuth");
const router = express.Router();

router.route("/auth").get(userAuth, userIsAuthicated);
router.route("/account/create").post(CreateUser);
router.route("/account/login").post(LoginUser);

module.exports = router;
