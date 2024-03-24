const UserModel = require("../../models/user/UserModel");
const jwt = require("jsonwebtoken");
const { hashPassword, verifyPassword } = require("../../utils/Hashpassword");

// user auth

const userIsAuthicated = async (req, res) => {
  try {
    const user = await UserModel.findById(req._id).select("+userType");
    if (user) {
      return res.status(200).json({
        message: "User Loggedin",
        sucsess: true,
        status: "success",
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      sucsess: false,
      status: "failed",
      error: error,
    });
    F;
  }
};

// create user
const CreateUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // encrypt password
  const encryptedPass = await hashPassword(password);

  try {
    const UserData = await UserModel.create({
      name: `${firstName} ${lastName}`,
      email,
      password: encryptedPass,
    });
    // save data to database
    const response = await UserData.save();
    return res.status(200).json({
      message: "User Created Succesfully",
      sucsess: true,
      status: "success",
      data: response,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Duplicate user email",
        sucsess: false,
        status: "failed",
      });
    }
    return res.status(500).json({
      message: "Internal Server Error",
      sucsess: false,
      status: "failed",
      error: error,
    });
  }
};

// user login

const LoginUser = async (req, res) => {
  try {
    const UserInfo = await UserModel.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!UserInfo) {
      return res.status(404).json({
        message: "User Not found",
        sucsess: false,
        status: "failed",
      });
    }
    // compare password
    const checkPassword = await verifyPassword(
      req.body.password,
      UserInfo.password
    );

    // Generate JWT token
    const token = jwt.sign(
      { _id: UserInfo._id, userType: UserInfo.userType },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    console.log("JWT Token:", token);

    // option to set cookie expire
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      domain: "http://localhost:3000",
      // sameSite:'lax'
      // sameSite: "none",
      // secure: true,
    };

    // ---------------------------------------
    if (!checkPassword) {
      return res.status(401).json({
        message: "Invalid Password",
        sucsess: false,
        status: "failed",
      });
    }
    // ---------------------------------------

    if (UserInfo.email === req.body.email && checkPassword) {
      // Token setting in header
      res.cookie("token", token, options);
      return res.status(200).json({
        message: "Logged in succesfully",
        sucsess: true,
        status: "success",
        data: UserInfo,
        token: token,
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

module.exports = { CreateUser, LoginUser, userIsAuthicated };
