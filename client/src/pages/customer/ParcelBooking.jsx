import { useState, useEffect } from "react";
import { createParcel, updateParcel ,deleteParcel} from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const ParcelBooking = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const parcelToEdit = location.state?.parcel;

	const isEditing = Boolean(parcelToEdit?._id);

	const [formData, setFormData] = useState({
		pickupAddress: parcelToEdit?.pickupAddress || "",
		deliveryAddress: parcelToEdit?.deliveryAddress || "",
		parcelType: parcelToEdit?.parcelType || "",
	});
	const [paymentMethod, setPaymentMethod] = useState("prepaid");
	const [paymentAmount, setPaymentAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	let basePrice = 0;
	const calculateAmount = (from, to) => {
		basePrice = 40;
		return basePrice;
	};

	useEffect(() => {
		if (paymentMethod === "COD") setPaymentAmount(paymentAmount + 20);
		else setPaymentAmount(paymentAmount - 20);
	}, [paymentMethod]);

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};


	const handleDelete = async () => {
		if(!parcelToEdit?._id)
		{
			return;
		}
		try {
			setLoading(true);
			const token = localStorage.getItem("token");
			await deleteParcel(parcelToEdit._id, token); // or parcelToEdit.packageId if you're using custom IDs
			toast.success("Parcel deleted successfully!");
			setShowDeleteModal(false)
			navigate("/customer/dashboard");
		} catch (err) {
			toast.error("Failed to delete parcel.");
		} finally {
			setLoading(false);
		}
	};
	
	const openConfirmationModal = (e) => {
		e.preventDefault();

		if (
			!formData.pickupAddress ||
			!formData.deliveryAddress ||
			!formData.parcelType
		) {
			toast.error("Please fill all required fields.");
			return;
		}
		setPaymentAmount(
			calculateAmount(formData.pickupAddress, formData.deliveryAddress)
		);
		setShowModal(true);
	};

	const finalSubmit = async () => {
		setLoading(true);
		const parcelData = {
			...formData,
			paymentMethod,
			paymentAmount,
		};

		try {
			if (isEditing) {
				console.log("editing...", parcelToEdit._id, parcelData);
				await updateParcel(parcelToEdit._id, parcelData);
				toast.success("Parcel updated successfully!");
			} else {
				await createParcel(parcelData);
				toast.success("Parcel booked successfully!");
			}
			setFormData({
				pickupAddress: "",
				deliveryAddress: "",
				parcelType: "",
			});
			setPaymentMethod("prepaid");
			setPaymentAmount(0);
			setShowModal(false);
			navigate("/customer/dashboard");
		} catch {
			toast.error("Failed to book parcel. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-xl mx-auto p-8 bg-white rounded-2xl  mt-12">
			<h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
				Book a Parcel Pickup
			</h2>
			<form onSubmit={openConfirmationModal} className="space-y-7">
				<div>
					{isEditing && (
						<input
							type="text"
							value={`PKG-${parcelToEdit.packageId}`}
							disabled
							className="w-full px-5 py-3 mb-8 border bg-gray-200 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					)}
					<label
						htmlFor="pickupAddress"
						className="block mb-2 font-semibold text-gray-700"
					>
						Pickup Address
					</label>
					<input
						id="pickupAddress"
						name="pickupAddress"
						type="text"
						placeholder="Enter pickup location"
						value={formData.pickupAddress}
						onChange={handleChange}
						required
						className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div>
					<label
						htmlFor="deliveryAddress"
						className="block mb-2 font-semibold text-gray-700"
					>
						Delivery Address
					</label>
					<input
						id="deliveryAddress"
						name="deliveryAddress"
						type="text"
						placeholder="Enter delivery location"
						value={formData.deliveryAddress}
						onChange={handleChange}
						required
						className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div>
					<label
						htmlFor="parcelType"
						className="block mb-2 font-semibold text-gray-700"
					>
						Parcel Type
					</label>
					<input
						id="parcelType"
						name="parcelType"
						type="text"
						placeholder="Documents, Electronics, Clothing, etc."
						value={formData.parcelType}
						onChange={handleChange}
						required
						className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="flex justify-between">
					 <button
						type="button"
						onClick={() => navigate("/customer/dashboard")}
						disabled={loading}
						className="px-5 py-2 mr-6 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-800"
					>
						Cancel
					</button>
					{isEditing && (
						<button
							type="button"
							onClick={()=>setShowDeleteModal(true)}
							disabled={loading}
							className="px-5 py-2 mr-6 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-800 transition"
						>
							Delete
						</button>
					)}
					<button
						type="submit"
						disabled={loading}
						className="w-full py-2 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-800 disabled:opacity-50 transition"
					>
						Continue to Payment
					</button>
				</div>
			</form>

			{/* Modal */}
			{showModal && (
				<div
					className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-40 backdrop-blur-[3px]"
					aria-modal="true"
					role="dialog"
				>
					<div className="bg-stone-100 rounded-2xl p-8 max-w-md w-full shadow-xl relative">
						<h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
							Confirm Payment
						</h3>

						<p className="mb-6 text-center text-xl font-medium text-gray-700">
							Payment Amount:{" "}
							<span className="text-blue-600">
								${paymentAmount}
							</span>
						</p>

						<div className="mb-8 flex justify-center gap-10">
							<label className="flex items-center gap-3 cursor-pointer">
								<input
									type="radio"
									name="paymentMethod"
									value="COD"
									checked={paymentMethod === "COD"}
									onChange={(e) =>
										setPaymentMethod(e.target.value)
									}
									className="form-radio text-blue-600"
								/>
								<span className="text-gray-800 font-medium">
									COD
								</span>
							</label>

							<label className="flex items-center gap-3 cursor-pointer">
								<input
									type="radio"
									name="paymentMethod"
									value="prepaid"
									checked={paymentMethod === "prepaid"}
									onChange={(e) =>
										setPaymentMethod(e.target.value)
									}
									className="form-radio text-blue-600"
								/>
								<span className="text-gray-800 font-medium">
									Prepaid
								</span>
							</label>
						</div>

						<div className="flex justify-between">
							<button
								onClick={() => setShowModal(false)}
								disabled={loading}
								className="px-5 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
							>
								Cancel
							</button>

							<button
								onClick={finalSubmit}
								disabled={loading}
								className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
							>
								{loading ? "Submitting..." : "Confirm & Submit"}
							</button>
						</div>
					</div>
				</div>
			)}
			{showDeleteModal && (
				<div
					className="fixed inset-0 flex items-center justify-center z-50  bg-opacity-40 backdrop-blur-[3px]"
					aria-modal="true"
					role="dialog"
				>
					<div className="bg-gray-300 rounded-2xl p-8 max-w-md w-full shadow-xl relative">
						<h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
							Are you sure to Delete This Package
						</h3>

						

						

							

						<div className="flex justify-between">
							<button
								onClick={() => setShowDeleteModal(false)}
								disabled={loading}
								className="px-5 py-2 rounded-lg bg-blue-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
							>
								NO
							</button>

							<button
								onClick={handleDelete}
								disabled={loading}
								className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
							>
								{loading ? "Deleting..." : "YES"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ParcelBooking;
