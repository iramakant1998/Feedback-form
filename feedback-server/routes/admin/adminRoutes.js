const express = require("express");
const {
  CreateAdmin,
  LoginAdmin,
  adminIsAuthicated,
} = require("../../contollers/admin/AdminController");
const { adminAuth } = require("../../contollers/admin/AdminAuth");

const router = express.Router();

router.route("/auth").get(adminAuth, adminIsAuthicated);
router.route("/account/create").post(CreateAdmin);
router.route("/account/login").post(LoginAdmin);

module.exports = router;
