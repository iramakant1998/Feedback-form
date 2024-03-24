const mongoose = require("mongoose");

const app = require("./app");
const PORT = process.env.PORT || 5000;
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require('socket.io')
const connectSocket = require("./socketService/socketController")
// const io = require("socket.io")(server);


const io = new Server(server, {
  cors: {
    origin: "*",
  }
});
// Handle Socket.IO connections and events
io.on("connection", (socket) => {
  console.log("A user connected!");

  connectSocket(io,socket)
  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shuting down....");
  console.log(err.name, err.message);
  process.exit(1); //to sutdown the app
});
const fs = require("fs");

const MONGO_URI = process.env.MONGO_URI;


// Database connection
mongoose.connect(MONGO_URI).then(() => {
  console.log(`Database connection successfully.`);
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running at port: ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shuting down....");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1); //to sutdown the app
  });
});
