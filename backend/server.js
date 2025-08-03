// import dotenv from "dotenv";
// dotenv.config();

// import connectDB from "./utils/db.js";
// import app from "./app.js";

// const PORT=process.env.PORT;

// connectDB().then(() => {
// 	app.listen(PORT, () => {
// 		console.log(`🚀 Server running on http://localhost:${PORT}`);
// 	});
// });

// new for socket io

// server.js
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import connectDB from "./utils/db.js";
import app from "./app.js";


const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://192.168.0.106:5173',
    'https://courier-and-parcel-management-system-1ojffshrb.vercel.app',
    'https://courier-and-parcel-management-syste-three.vercel.app'
  ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
  }
});


io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  // Example: Emit a welcome event
  socket.emit("welcome", "Welcome to Parcel Tracker Socket!");

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

export { io };


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
