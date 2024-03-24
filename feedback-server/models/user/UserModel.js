const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { type } = require("os");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    userType: {
      type: String,
      default: "user",
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

const User = mongoose.model("User", UserSchema);

module.exports = User;
