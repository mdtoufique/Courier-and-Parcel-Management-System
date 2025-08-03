import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateParcel } from "../../api/api";

const ParcelStateUpdate = () => {
	const loc = useLocation();
	const navigate = useNavigate();
	const parcel = loc.state?.parcel;
	const [showModal, setShowModal] = useState(false);
	const [status, setStatus] = useState(parcel?.status || "Booked");
	const [loading, setLoading] = useState(false);
	const [note, setNote] = useState("");
	const [location, setLocation] = useState({ lat: null, lng: null });

	const statusTransitions = {
		Booked: ["Picked Up", "Failed"],
		"Picked Up": ["In Transit", "Failed"],
		"In Transit": ["Delivered", "Failed"],
		Delivered: [],
		Failed: [],
	};

	console.log("from beg", status);

	const openConfirmationModal = (e) => {
		e.preventDefault();

		if (!parcel?._id) return;
		if (status === parcel.status) {
			toast.error("Please select next Status");
			return;
		}
        if (status === "Failed" && (!note || typeof note !== 'string' || note.trim().length === 0)) {
            toast.error("Note must be written for Failed Package");
            return;
        }
		if (!location?.lat || !location?.lng) {
			toast.error("Please select location");
			return;
		}

		setShowModal(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			await updateParcel(parcel._id, { status, note, location });
			toast.success("Status updated successfully!");
			navigate("/agent/dashboard");
		} catch (err) {
			toast.error("Failed to update status");
		} finally {
			setLoading(false);
		}
	};

	const currentStatus = parcel?.status || "Booked";
	const nextStatuses = statusTransitions[currentStatus];

	return (
		<div className="max-w-xl mx-auto p-8 bg-white rounded-2xl mt-12">
			<h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
				Update Parcel Status
			</h2>
			<form onSubmit={openConfirmationModal} className="space-y-6">
				<div>
					<input
						type="text"
						value={`PKG - ${parcel.packageId}`}
						disabled
						className="w-full px-5 py-3 border bg-gray-200 border-gray-300 rounded-lg"
					/>
				</div>

				<div>
					<label className="block mb-2 font-semibold text-gray-700">
						Customer Name
					</label>

					<input
						type="text"
						value={parcel.customer.name}
						disabled
						className="w-full px-5 py-3 border bg-gray-200 border-gray-300 rounded-lg"
					/>
				</div>

				<div>
					<label className="block mb-2 font-semibold text-gray-700">
						Contact Number
					</label>
					<input
						type="text"
						value={parcel.customer.phone}
						disabled
						className="w-full px-5 py-3 border bg-gray-200 border-gray-300 rounded-lg"
					/>
				</div>
				<div>
					<label className="block mb-2 font-semibold text-gray-700">
						Pick Up Addresss
					</label>
					<input
						type="text"
						value={parcel.pickupAddress}
						disabled
						className="w-full px-5 py-3 border bg-gray-200 border-gray-300 rounded-lg"
					/>
				</div>

				<div>
					<label className="block mb-2 font-semibold text-gray-700">
						Delivery Address
					</label>

					<input
						type="text"
						value={parcel.deliveryAddress}
						disabled
						className="w-full px-5 py-3 border bg-gray-200 border-gray-300 rounded-lg"
					/>
				</div>
				<div>
					<label className="block mb-2 font-semibold text-gray-700">
						Current Status
					</label>
					<input
						type="text"
						value={parcel.status}
						disabled
						className="w-full px-5 py-3 border bg-gray-200 border-gray-300 rounded-lg"
					/>
				</div>
				<div>
					<label className="block mb-2 font-semibold text-gray-700">
						Note
					</label>
					<textarea
						className="w-full px-5 py-3 border border-gray-300 rounded-lg resize-none"
						value={note}
						onChange={(e) => setNote(e.target.value)}
						placeholder="Optional note about the update"
					/>
				</div>

				<div className="mb-4">
					<label className="block mb-2 font-semibold text-gray-700">
						Location
					</label>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => {
								if (navigator.geolocation) {
									navigator.geolocation.getCurrentPosition(
										(pos) => {
											setLocation({
												lat: pos.coords.latitude,
												lng: pos.coords.longitude,
											});
										},
										() =>
											alert("Unable to retrieve location")
									);
								} else {
									alert("Geolocation not supported");
								}
							}}
							className="w-1/2 bg-green-600 text-white rounded hover:bg-green-800 px-4 py-2"
						>
							Get Location
						</button>
						<div className="w-full flex gap-2">
							<input
								type="number"
								step="0.0001"
								placeholder="Latitude"
								value={location.lat || ""}
								onChange={(e) =>
									setLocation((prev) => ({
										...prev,
										lat: parseFloat(e.target.value) || "",
									}))
								}
								className="w-1/2 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<input
								type="number"
								step="0.0001"
								placeholder="Longitude"
								value={location.lng || ""}
								onChange={(e) =>
									setLocation((prev) => ({
										...prev,
										lng: parseFloat(e.target.value) || "",
									}))
								}
								className="w-1/2 px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>
				</div>

				<div>
					<label className="block mb-2 font-semibold text-gray-700">
						Status
					</label>
					<select
						value={status}
						onChange={(e) => {
							setStatus(e.target.value);
							
						}}
						className="w-full px-5 py-3 border border-gray-300 rounded-lg"
					>
						<option value="">-- Select Status --</option>
						{nextStatuses.map((s) => {
							return (
								<option key={s} value={s}>
									{s}
								</option>
							);
						})}
					</select>
				</div>

				<div className="flex justify-between">
					<button
						type="button"
						onClick={() => navigate("/agent/dashboard")}
						className="px-5 py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-800"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={loading}
						className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-800"
					>
						{loading ? "Updating..." : "Update Status"}
					</button>
				</div>
			</form>
			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-40 backdrop-blur-[3px]">
					<div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
						<h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
							Confirm Update
						</h3>
						{/* <p className="mb-6 text-center text-xl font-medium text-gray-700">
							Payment Amount:{" "}
							<span className="text-blue-600">
								${paymentAmount}
							</span>
						</p> */}

						<div className="flex justify-between">
							<button
								onClick={() => setShowModal(false)}
								className="px-5 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400"
							>
								Cancel
							</button>
							<button
								onClick={handleSubmit}
								disabled={loading}
								className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
							>
								{loading ? "Updating..." : "Confirm"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ParcelStateUpdate;
