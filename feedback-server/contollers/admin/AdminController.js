const AdminModel = require("../../models/admin/AdminModel");
const jwt = require("jsonwebtoken");
const { hashPassword, verifyPassword } = require("../../utils/Hashpassword");

// user auth

const adminIsAuthicated = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req._id).select("+userType");
    if (admin) {
      return res.status(200).json({
        message: "User Loggedin",
        sucsess: true,
        status: "success",
        data: admin,
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

// admin user
const CreateAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // encrypt password
  const encryptedPass = await hashPassword(password);
  try {
    const AdminData = await AdminModel.create({
      name: `${firstName} ${lastName}`,
      email,
      password: encryptedPass,
    });
    console.log("---->", AdminData);
    const response = await AdminData.save();
    console.log("response===>", response);
    return res.status(200).json({
      message: "Admiin Created Succesfully",
      sucsess: true,
      status: "success",
      data: response,
    });
  } catch (error) {
    //
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Duplicate admin email",
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

// admin login

const LoginAdmin = async (req, res) => {
  console.log("working", req.body.password);
  try {
    const AdminInfo = await AdminModel.findOne({
      email: req.body.email,
    }).select("+password");
    console.log("AdminInfo==>", AdminInfo);
    if (!AdminInfo) {
      return res.status(404).json({
        message: "User Not found",
        sucsess: false,
        status: "failed",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: AdminInfo._id, userType: AdminInfo.userType },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    console.log("oooo=>", token);

    // compare password
    const checkPassword = await verifyPassword(
      req.body.password,
      AdminInfo.password
    );

    // option to set cookie expire
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      // httpOnly: true,
      httpOnly: true,
      sameSite: "none",
      // secure: true,
    };

    if (!checkPassword) {
      return res.status(401).json({
        message: "Invalid Password",
        sucsess: false,
        status: "failed",
      });
    }
    if (AdminInfo.email === req.body.email && checkPassword) {
      res.cookie("token", token, options);
      return res.status(200).json({
        message: "Logged in successfully",
        sucsess: true,
        status: "success",
        data: AdminInfo,
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

module.exports = { CreateAdmin, LoginAdmin, adminIsAuthicated };
