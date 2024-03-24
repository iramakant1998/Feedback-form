const FeedbackModel = require("../../models/feedback/FeedbackModel");
// create user
const AddFeedback = async (req, res) => {
  const { customerName, userPhone, userEmail, feedback } = req.body;
  try {
    const FeedbackData = await FeedbackModel.create({
      customerName,
      userPhone,
      userEmail,
      feedback,
    });
    const response = await FeedbackData.save();
    return res.status(200).json({
      message: "Your feedback added succesfully",
      sucsess: true,
      status: "success",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      sucsess: false,
      status: "failed",
      error: error,
    });
  }
};

const GetAllFeedback = async (req, res) => {
  try {
    const FeedbackData = await FeedbackModel.find().sort({ createdAt: -1 });
    if (FeedbackData) {
      return res.status(200).json({
        message: "All Feedbacks Fetched",
        sucsess: true,
        status: "success",
        FeedbackData,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      sucsess: false,
      status: "failed",
      error: error,
    });
  }
};

// findone feedack

const GetSingleFeedback = async (req, res) => {
  try {
    const SingleFeedback = await FeedbackModel.findById(req._id);
    if (FeedbackData) {
      return res.status(200).json({
        message: "Feedback is fetched",
        sucsess: true,
        status: "success",
        data: SingleFeedback,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      sucsess: false,
      status: "failed",
      error: error,
    });
  }
};

module.exports = { AddFeedback, GetAllFeedback, GetSingleFeedback };
