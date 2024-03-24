const { insert_feedback, fetch_feedback } = require("./formController");

// controller to connect socket
function connectSocket(io, socket) {
  socket.on("feedback", async (msg) => {
    console.log("Received message:", typeof msg);
    const isResponse = await insert_feedback(msg);
    if (isResponse) {
      io.emit("feedback", true);
    } else {
      io.emit("feedback", false);
    }
    // Broadcast the message to all connected clients
  });

  
  //   fetch data from data base
  socket.on("feedback_Fetch", async () => {
    const isResponse = await fetch_feedback(msg);
    if (isResponse) {
      io.emit("feedback_Fetch", isResponse);
    } else {
      io.emit("feedback_Fetch", false);
    }
    // Broadcast the message to all connected clients
  });

  socket.on("review", (msg) => {
    // Broadcast the message to all connected clients
    io.emit("review", msg);
  });
}

module.exports = connectSocket;
