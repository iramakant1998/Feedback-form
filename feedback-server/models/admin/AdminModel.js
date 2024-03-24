const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { type } = require("os");

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    userType: {
      type: String,
      default: "admin",
      select: false,
    },
    password: { type: String, select: false },
    email: {
      type: String,
      unique: true, // Make the username field unique
      required: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

// Define middleware to handle duplicate key error
// AdminSchema.post("save", function (error, doc, next) {
//   console.log("workiin");
//   if (error.code === 11000) {
//     return new Error("Duplicate key error"); // Throw error for duplicate key
//   } else {
//     next(error);
//     console.log("eepr", error);
//   }
// });

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
