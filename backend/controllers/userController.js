import User from "../models/User.js";

export const getUsersByRole = async (req, res) => {
	try {
		const roleToGet = req.params.userRole;

		if (req.user.role !== "admin") {
			return res.status(403).json({ message: "Unauthorized role" });
		}

		const users = await User.find({ role: roleToGet }).select("name email phone role");

		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({
			message: "Failed to fetch users",
			error: error.message,
		});
		
	}
};
