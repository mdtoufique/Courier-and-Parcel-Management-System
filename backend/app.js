import express from "express";import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import parcelRoutes from "./routes/parcelRoutes.js"
import userRoutes from "./routes/userRoute.js"

import http from "http";
import { Server } from "socket.io";

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://192.168.0.106:5173',
    'https://courier-and-parcel-management-system-1ojffshrb.vercel.app',
    'https://courier-and-parcel-management-syste-three.vercel.app'
  ],
 methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/parcels", parcelRoutes);
app.use("/api/users", userRoutes);
export default app;