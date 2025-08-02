import mongoose from "mongoose";
const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Notification",NotificationSchema);