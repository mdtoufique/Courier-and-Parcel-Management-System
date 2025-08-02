import express from "express";import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import parcelRoutes from "./routes/parcelRoutes.js"
import userRoutes from "./routes/userRoute.js"


const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
  ],
  methods: ['GET', 'POST','PUT','DELETE'],
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/parcels", parcelRoutes);
app.use("/api/users", userRoutes);
export default app;