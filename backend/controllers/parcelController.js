import Parcel from "../models/Parcel.js";
import Counter from "../models/Counter.js";

// Create Parcel
export const createParcel = async (req, res) => {
	console.log("hi");
	try {
		const {
			pickupAddress,
			deliveryAddress,
			parcelType,
			paymentMethod,
			paymentAmount,
		} = req.body;

		if (
			!pickupAddress ||
			!deliveryAddress ||
			!parcelType ||
			!paymentMethod
		) {
			return res
				.status(400)
				.json({ message: "All fields are required." });
		}

		const customerId = req.user.id;

		const newParcel = new Parcel({
			pickupAddress,
			deliveryAddress,
			parcelType,
			paymentMethod,
			paymentAmount,
			customer: customerId,
		});

		await newParcel.save();
		res.status(201).json({
			message: "Parcel booked successfully.",
			parcel: newParcel,
		});
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Get all parcels (admin or customer)
export const getParcels = async (req, res) => {
	try {
		let parcels;

		if (req.user.role === "admin") {
			parcels = await Parcel.find().populate(
				"customer agent",
				"name email phone role"
			);
		} else if (req.user.role === "customer") {
			parcels = await Parcel.find({ customer: req.user.id }).populate(
				"agent",
				"name email"
			);
		} else if (req.user.role === "agent") {
			parcels = await Parcel.find({ agent: req.user.id }).populate(
				"customer",
				"name email"
			);
		} else {
			return res.status(403).json({ message: "Unauthorized role" });
		}

		res.status(200).json(parcels);
	} catch (error) {
		res.status(500).json({
			message: "Failed to fetch parcels",
			error: error.message,
		});
	}
};

// Update Parcel (e.g. assign agent or change status)
export const updateParcel = async (req, res) => {
	try {
		const { id } = req.params;
		const updateFields = req.body;

		const updated = await Parcel.findByIdAndUpdate(id, updateFields, {
			new: true,
		});

		if (!updated)
			return res.status(404).json({ message: "Parcel not found" });

		res.status(200).json({ message: "Parcel updated", parcel: updated });
	} catch (error) {
		res.status(500).json({
			message: "Failed to update parcel",
			error: error.message,
		});
	}
};

// Delete Parcel (admin or customer's own)
export const deleteParcel = async (req, res) => {
	try {
		const { id } = req.params;

		const parcel = await Parcel.findById(id);
		if (!parcel)
			return res.status(404).json({ message: "Parcel not found" });

		// Optional: allow only admin or parcel owner to delete
		if (
			req.user.role !== "admin" &&
			parcel.customer.toString() !== req.user.id
		) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		await Parcel.findByIdAndDelete(id);

		res.status(200).json({ message: "Parcel deleted successfully" });
	} catch (error) {
		res.status(500).json({
			message: "Failed to delete parcel",
			error: error.message,
		});
	}
};
