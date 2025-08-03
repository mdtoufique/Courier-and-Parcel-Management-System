import mongoose from "mongoose";
import Counter from "./Counter.js";
const ParcelSchema = new mongoose.Schema(
	{
		packageId: { type: Number, unique: true },
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		agent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		pickupAddress: { type: String, required: true },
		deliveryAddress: { type: String, required: true },
		parcelType: { type: String, required: true },
		paymentMethod: {
			type: String,
			enum: ["COD", "prepaid"],
			required: true,
		},

		paymentAmount: { type: Number, required: true },
		codAmount: Number,
		isPaid: { type: Boolean, default: false },

		status: {
			type: String,
			enum: ["Booked", "Picked Up", "In Transit", "Delivered", "Failed"],
			default: "Booked",
		},
		trackingHistory: [
			{
				status: String,
				note: {
					type: String,
					default: "",
				},
				location: {
					lat: Number,
					lng: Number,
				},
				timestamp: { type: Date, default: Date.now },
			},
		],
		qrCodeUrl: String,
		barcode: String,
	},
	{ timestamps: true }
);

ParcelSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: "parcel" },
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    );
    this.packageId = counter.seq;
  }
  next();
});

export default mongoose.model("Parcel", ParcelSchema);
