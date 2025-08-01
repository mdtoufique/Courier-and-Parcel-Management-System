import express from "express";import cors from "cors";
import authRoutes from "./routes/authRoutes.js";




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

export default app;