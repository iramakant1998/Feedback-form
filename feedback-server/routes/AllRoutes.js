const express = require("express");
const router = express.Router();
const UserRoutes = require("./user/userRoutes");
const AdminRoutes = require("./admin/adminRoutes");
const FeedbackRoutes = require("./feedback/FeedbackRoute");

console.log("working fine")
router.use("/user", UserRoutes);
router.use("/admin", AdminRoutes);
router.use("/feedback", FeedbackRoutes);

module.exports = router;
