const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    // user: { type: ref },
    customerName: { type: String },
    userEmail: {
      type: String,
    },
    userPhone: {
      type: String,
    },
    feedback: {
      type: String,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;
