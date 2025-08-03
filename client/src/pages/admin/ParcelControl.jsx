import { useState, useEffect } from "react";
import { updateParcel, deleteParcel, getUsers } from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const ParcelControl = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const parcelToEdit = location.state?.parcel;
	const [isEditable, setIsEditable] = useState(false);
    const [isAgent, setIsAgent] = useState(!!parcelToEdit?.agent);
	const [formData, setFormData] = useState({
		pickupAddress: parcelToEdit?.pickupAddress || "",
		deliveryAddress: parcelToEdit?.deliveryAddress || "",
		parcelType: parcelToEdit?.parcelType || "",
		agent: parcelToEdit?.agent || null,
		status:parcelToEdit?.status || "Booked"
	});

	const [paymentMethod, setPaymentMethod] = useState(
		parcelToEdit?.paymentMethod || "prepaid"
	);
	const [paymentAmount, setPaymentAmount] = useState(
		parcelToEdit?.paymentAmount || 0
	);
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [agents, setAgents] = useState([]);

	useEffect(() => {
		const fetchAgents = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await getUsers("agent");
				setAgents(res);
			} catch (err) {
				toast.error("Failed to load agents");
			}
		};

		fetchAgents();
	}, []);

	// const handleChange = (e) => {
	// 	const { name, value } = e.target;
	// 	if (name === "agent") {
	// 		const selectedAgent = agents.find((a) => a._id === value);
	// 		setFormData((prev) => ({
	// 			...prev,
	// 			agent: selectedAgent || value, 
	// 		}));
	// 	} else {
	// 		setFormData((prev) => ({ ...prev, [name]: value }));
	// 	}
	// 	console.log(formData.agent.name);
	// };
	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === "agent") {
			if (value === "") {
				setFormData((prev) => ({
					...prev,
					agent: null,
				}));
			} else {
				const selectedAgent = agents.find((a) => a._id === value);
				setFormData((prev) => ({
					...prev,
					agent: selectedAgent || value,
				}));
			}
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleDelete = async () => {
		if (!parcelToEdit?._id) return;

		try {
			setLoading(true);
			const token = localStorage.getItem("token");
			await deleteParcel(parcelToEdit._id, token);
			toast.success("Parcel deleted successfully!");
			setShowDeleteModal(false);
			navigate("/admin/dashboard");
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
			!formData.parcelType ||
			!formData.status
		) {
			toast.error("Please fill all required fields.");
			return;
		}

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
			await updateParcel(parcelToEdit._id, parcelData);
			toast.success("Parcel updated successfully!");
			setShowModal(false);
			navigate("/admin/dashboard");
		} catch (err) {
			toast.error("Failed to update parcel.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-xl mx-auto p-8 bg-white rounded-2xl mt-12">
			<h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
				Manage Parcel
			</h2>
			<form onSubmit={openConfirmationModal} className="space-y-7">
				<input
					type="text"
					value={`PKG - ${parcelToEdit.packageId}`}
					disabled
					className="w-full px-5 py-3 mb-4 border bg-gray-200 border-gray-300 rounded-lg"
				/>
				<input
					type="text"
					value={
						parcelToEdit.customer?.name
							? `Customer : ${parcelToEdit.customer.name} ( ${parcelToEdit.customer.phone} )`
							: "No info available"
					}
					disabled
					className="w-full px-5 py-3 mb-4 border bg-gray-200 border-gray-300 rounded-lg"
				/>
				<input
					type="text"
					value={
						formData.agent?.name
							? `Agent : ${formData.agent?.name} ( ${formData.agent?.phone} )`
							: "No agent selected"
					}
					disabled
					className="w-full px-5 py-3 mb-4 border bg-gray-200 border-gray-300 rounded-lg"
				/>

				<div>
					<label className="block mb-2 font-semibold text-gray-700 ">
						Pickup Address
					</label>
					<input
						name="pickupAddress"
						type="text"
						value={formData.pickupAddress}
						onChange={handleChange}
						disabled={!isEditable}
						required
						className="w-full px-5 py-3 border border-gray-300 rounded-lg disabled:bg-gray-300"
					/>
				</div>

				<div>
					<label className="block mb-2 font-semibold text-gray-700">
						Delivery Address
					</label>
					<input
						name="deliveryAddress"
						type="text"
						value={formData.deliveryAddress}
						onChange={handleChange}
						disabled={!isEditable}
						required
						className="w-full px-5 py-3 border border-gray-300 rounded-lg disabled:bg-gray-300"
					/>
				</div>

				<div>
					<label className="block mb-2 font-semibold text-gray-700">
						Parcel Type
					</label>
					<input
						name="parcelType"
						type="text"
						value={formData.parcelType}
						disabled={!isEditable}
						onChange={handleChange}
						required
						className="w-full px-5 py-3 border border-gray-300 rounded-lg disabled:bg-gray-300"
					/>
				</div>
				<div>
					<label className="block mb-2 font-semibold text-gray-700">
						Payment Amount
					</label>
					<input
						name="paymentAmount"
						type="number"
						value={paymentAmount}
						disabled={!isEditable}
						onChange={(e) =>
							setPaymentAmount(Number(e.target.value))
						}
						required
						className="w-full px-5 py-3 border border-gray-300 rounded-lg disabled:bg-gray-300"
					/>
				</div>

				<div className="mb-8 flex justify-center gap-10">
					{["COD", "prepaid"].map((method) => (
						<label
							key={method}
							className={`flex items-center gap-3 cursor-pointer ${
								!isEditable
									? "cursor-not-allowed opacity-60"
									: ""
							}`}
						>
							<input
								type="radio"
								name="paymentMethod"
								value={method}
								checked={paymentMethod === method}
								onChange={(e) =>
									setPaymentMethod(e.target.value)
								}
								disabled={!isEditable}
								className="form-radio text-blue-600"
							/>
							<span className="text-gray-800 font-medium">
								{method.toUpperCase()}
							</span>
						</label>
					))}
				</div>

				<div>
					<label className="block mb-2 font-semibold text-gray-700">
						Status
					</label>
					<select
						name="status"
						value={formData.status}
						onChange={handleChange}
						disabled={!isEditable}
						className="w-full px-5 py-3 border border-gray-300 rounded-lg disabled:bg-gray-300"
					>
						
						<option value="Booked">Booked</option>
						<option value="Picked Up">Picked Up</option>
						<option value="In Transit">In Transit</option>
						<option value="Delivered">Delivered</option>
						<option value="Failed">Failed</option>
					</select>
				</div>

				<div>
					<label className="block mb-2 font-semibold text-gray-700">
						Assign Agent
					</label>
					<select
						name="agent"
						value={formData.agent?._id}
						onChange={handleChange}
                        disabled={!isEditable && isAgent}
						className="w-full px-5 py-3 border border-gray-300 rounded-lg disabled:bg-gray-300"
					>
						<option value="">Select an Agent</option>
						<option value="">Remove Agent</option>
						{agents.map((agent) => (
							<option key={agent._id} value={agent._id}>
								{agent.name}
							</option>
						))}
					</select>
				</div>

				<div className="flex justify-between">
                
                        <button
						type="button"
						onClick={() => navigate("/admin/dashboard")}
						disabled={loading}
						className="px-5 py-2 mr-6 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-800"
					>
						Cancel
					</button>

					<button
						type="button"
						onClick={() => {setIsEditable((prev) => !prev);setIsAgent(true);}}
						className="px-5 py-2 mr-6 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-800"
					>
						{isEditable ? "Editing..." : "Edit"}
					</button>
					<button
						type="button"
						onClick={() => setShowDeleteModal(true)}
						disabled={loading}
						className="px-5 py-2 mr-6 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-800"
					>
						Delete
					</button>
					<button
						type="submit"
						disabled={loading}
						className="w-full py-2 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-800"
					>
						Confirm
					</button>
				</div>
			</form>

			{/* Confirm Modal */}
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
								onClick={finalSubmit}
								disabled={loading}
								className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
							>
								{loading ? "Updating..." : "Confirm"}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Delete Modal */}
			{showDeleteModal && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-40 backdrop-blur-[3px]">
					<div className="bg-gray-300 rounded-2xl p-8 max-w-md w-full shadow-xl">
						<h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
							Delete this parcel?
						</h3>
						<div className="flex justify-between">
							<button
								onClick={() => setShowDeleteModal(false)}
								className="px-5 py-2 rounded-lg bg-blue-300 text-gray-700 font-semibold hover:bg-gray-400"
							>
								No
							</button>
							<button
								onClick={handleDelete}
								disabled={loading}
								className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-blue-700"
							>
								{loading ? "Deleting..." : "Yes, Delete"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ParcelControl;
