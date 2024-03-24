// import modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");


//Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("common"));

//middleware imports
const AllAPIRoutes = require("./routes/AllRoutes");

// Project Routes
app.use("/api/v1/", AllAPIRoutes);
module.exports = app;
