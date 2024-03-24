const express = require("express");
const { Server } = require("socket.io");
const {
  AddFeedback,
  GetSingleFeedback,
  GetAllFeedback,
} = require("../../contollers/feedback/FeedbackController");

const router = express.Router();

router.route("/create").post(AddFeedback).get(GetAllFeedback);
router.route("/single/:id").get(GetSingleFeedback);

module.exports = router;
