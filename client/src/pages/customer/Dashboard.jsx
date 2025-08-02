import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchParcels } from "../../api/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
	const [parcels, setParcels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [reload, setReload] = useState(false);
	function reloadTasks() {
		setReload((prev) => !prev);
	}

	const navigate = useNavigate();

	useEffect(() => {
		const loadParcels = async () => {
			try {
				setLoading(true);
				setError("");

				const token = localStorage.getItem("token");
				const fetchedParcels = await fetchParcels(token);
				setParcels(fetchedParcels);
			} catch (err) {
				toast.error("Failed to fetch parcels.", err);
			} finally {
				setLoading(false);
			}
		};

		loadParcels();
	}, []);

	return (
		<div className="max-w-5xl mx-auto p-6 mt-10">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">My Parcel Bookings</h1>
				<Link
					to="/customer/book-parcel"
					className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
				>
					Book New Parcel
				</Link>
			</div>
			{loading && <p>Loading parcels...</p>}

			{!loading && parcels.length === 0 && (
				<p>You have no parcel bookings yet.</p>
			)}

			{!loading && parcels.length > 0 && (
				<table className="w-full table-auto border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100">
							<th className="border border-gray-300 px-4 py-2 text-left">
								Parcel ID
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Pickup Address
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Delivery Address
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Status
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Payment Amount
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Payment Method
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Edit
							</th>
						</tr>
					</thead>
					<tbody>
						{parcels.map((parcel) => (
							<tr
								key={parcel.packageId}
								className="hover:bg-gray-50"
							>
								<td className="border border-gray-300 px-4 py-2">
									{"PKG-" + parcel.packageId}
								</td>
								<td className="border border-gray-300 px-4 py-2">
									{parcel.pickupAddress}
								</td>
								<td className="border border-gray-300 px-4 py-2">
									{parcel.deliveryAddress}
								</td>
								<td className="border border-gray-300 px-4 py-2 capitalize">
									{parcel.status}
								</td>
								<td className="border border-gray-300 px-4 py-2 uppercase">
									{parcel.paymentAmount}
								</td>
								<td className="border border-gray-300 px-4 py-2 uppercase">
									{parcel.paymentMethod}
								</td>
								<td className="border border-gray-300 px-4 py-2">
									{parcel.status === "Booked" ? (
										<button
											className="text-blue-600 hover:underline"
											onClick={() => navigate("/customer/book-parcel", { state: { parcel } })}
										>
											Edit
										</button>
									) : (
										<span className="text-gray-400 cursor-not-allowed">
											N/A
										</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Dashboard;
