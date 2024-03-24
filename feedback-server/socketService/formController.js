const FeedbackModel = require("../models/feedback/FeedbackModel");

const insert_feedback = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const objData = JSON.parse(data);
      const InsertData = await FeedbackModel.create({
        customerName: objData.customerName,
        userEmail: objData.userEmail,
        feedback: objData.feedback,
      });
      const res = await FeedbackModel.find();
      if (res) {
        resolve(true);
      } else {
        reject(false)
      }
    } catch (error) {
      reject(false);
    }
  });
};

// fetch feedback data
const fetch_feedback = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      //   console.log("insert",InsertData)

      const res = await FeedbackModel.find();
      if (res) resolve(res);
    } catch (error) {
      reject("Nooooo!!!!!!!!!!!!!");
    }
  });
};

module.exports = {
  insert_feedback,
  fetch_feedback,
};
