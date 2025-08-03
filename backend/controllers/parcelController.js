import Parcel from "../models/Parcel.js";
import Counter from "../models/Counter.js";
import { io } from "../server.js";
// Create Parcel
export const createParcel = async (req, res) => {
	try {
		const {
			pickupAddress,
			deliveryAddress,
			parcelType,
			paymentMethod,
			paymentAmount,
			location,
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
		
		newParcel.trackingHistory.push({
			status: "Booked",
			location,
			note: "Percel Booked.",
		});
		await newParcel.save();
		const created = await Parcel.findById(newParcel._id).populate(
			"customer",
			"name email phone role"
		);
		console.log(created);
		io.sockets.emit("parcelCreated", created);
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
			const filter = {};

			if (req.query.customer) {
				filter.customer = req.query.customer;
			}

			if (req.query.agent) {
				filter.agent = req.query.agent;
			}
			parcels = await Parcel.find(filter).populate(
				"customer agent",
				"name email phone role"
			);
		} else if (req.user.role === "customer") {
			parcels = await Parcel.find({ customer: req.user.id }).populate(
				"agent",
				"name email phone"
			);
		} else if (req.user.role === "agent") {
			parcels = await Parcel.find({ agent: req.user.id }).populate(
				"customer",
				"name email phone"
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
		let updateFields = req.body;
		const parcel = await Parcel.findById(id);
		if (!parcel)
			return res.status(404).json({ message: "Parcel not found" });

		if (req.user.role === "agent") {
			const { status, location, note } = updateFields;

			const allowedTransitions = {
				Booked: ["Picked Up", "Failed"],
				"Picked Up": ["In Transit", "Failed"],
				"In Transit": ["Delivered", "Failed"],
				Delivered: [],
				Failed: [],
			};

			const currentStatus = parcel.status;
			const newStatus = req.body.status;

			if (!allowedTransitions[currentStatus]?.includes(newStatus)) {
				return res.status(400).json({
					message: `Invalid status transition from ${currentStatus} to ${newStatus}`,
				});
			}

			parcel.trackingHistory.push({
				status,
				location,
				note: note || "",
			});
			parcel.status = status;

			await parcel.save();
			const updated = await Parcel.findById(parcel._id).populate(
				"customer agent",
				"name email phone role"
			);
			io.sockets.emit("parcelUpdated", updated);
			return res.status(200).json({ message: "Parcel updated", parcel });
		}
		
		let updated = await Parcel.findByIdAndUpdate(id, updateFields, {
			new: true,
		});

		
		if (!updated)
			return res.status(404).json({ message: "Parcel not found" });
		if(parcel.status==="Failed" && parcel.status!==updated.status)
		{
			updated.trackingHistory.push({
				status:updated.status,
				location:updated.location,
				note:"resolved by admin",
			});
			await updated.save();
		}
		io.sockets.emit("parcelUpdated", updated);
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

		
		if (req.user.role !== "admin" &&
			parcel.customer.toString() !== req.user.id) {
			return res.status(403).json({ message: "Unauthorized" });
		}

		await Parcel.findByIdAndDelete(id);
		io.sockets.emit("parcelDeleted");
		res.status(200).json({ message: "Parcel deleted successfully" });
	} catch (error) {
		res.status(500).json({
			message: "Failed to delete parcel",
			error: error.message,
		});
	}
};
