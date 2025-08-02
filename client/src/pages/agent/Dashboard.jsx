import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchParcels } from "../../api/api";
import { toast } from "react-hot-toast";

const Dashboard = () => {
	const [parcels, setParcels] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const loadParcels = async () => {
			try {
				setLoading(true);
				const fetchedParcels = await fetchParcels();
				setParcels(fetchedParcels);
			} catch (err) {
				toast.error("Failed to fetch parcels.");
			} finally {
				setLoading(false);
			}
		};

		loadParcels();
	}, []);

	return (
		<div className="max-w-5xl mx-auto p-6 mt-10">
			<h1 className="text-3xl font-bold mb-8">Agent Parcel Dashboard</h1>

			{loading && <p>Loading your assigned parcels...</p>}

			{!loading && parcels.length === 0 && (
				<p>No parcels have been assigned to you yet.</p>
			)}

			{!loading && parcels.length > 0 && (
				<table className="w-full table-auto border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100">
							<th className="border border-gray-300 px-4 py-2 text-left">Parcel ID</th>
							<th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
							<th className="border border-gray-300 px-4 py-2 text-left">Pickup Address</th>
							<th className="border border-gray-300 px-4 py-2 text-left">Delivery Address</th>
							<th className="border border-gray-300 px-4 py-2 text-left">Status</th>
							<th className="border border-gray-300 px-4 py-2 text-left">Action</th>
						</tr>
					</thead>
					<tbody>
						{parcels.map((parcel) => (
							<tr key={parcel.packageId} className="hover:bg-gray-50">
								<td className="border border-gray-300 px-4 py-2">{`PKG-${parcel.packageId}`}</td>
								<td className="border border-gray-300 px-4 py-2">{parcel.customer?.name || "N/A"}</td>
								<td className="border border-gray-300 px-4 py-2">{parcel.pickupAddress}</td>
								<td className="border border-gray-300 px-4 py-2">{parcel.deliveryAddress}</td>
								<td className="border border-gray-300 px-4 py-2 capitalize">{parcel.status}</td>
								<td className="border border-gray-300 px-4 py-2">
									<button
										onClick={() =>
											navigate("/agent/parcel-update", {
												state: { parcel },
											})
										}
										className="text-blue-600 hover:underline"
									>
										Update
									</button>
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
