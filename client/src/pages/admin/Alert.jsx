import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchParcels } from "../../api/api";
import { toast } from "react-hot-toast";

const Alert = () => {
	const [failedParcels, setFailedParcels] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const loadFailedParcels = async () => {
			try {
				const data = await fetchParcels();
				const failed = data.filter((parcel) => parcel.status === "Failed");
				setFailedParcels(failed);
			} catch (err) {
				toast.error("Failed to load parcels.");
			} finally {
				setLoading(false);
			}
		};

		loadFailedParcels();
	}, []);

	if (loading) return <p className="text-center">Loading failed parcels...</p>;

	return (
		<div className="max-w-5xl mx-auto p-6">
			<h2 className="text-2xl font-bold text-red-600 mb-6">🚨 Failed Parcels</h2>

			{failedParcels.length === 0 ? (
				<p className="text-center text-gray-500">No failed parcels found.</p>
			) : (
				failedParcels.map((parcel) => (
					<div
						key={parcel._id}
						className="mb-8 border border-red-300 rounded-lg shadow-md p-4 bg-red-50"
					>
						<div className="flex justify-between items-center mb-2">
							<h3 className="text-lg font-semibold text-red-700">
								📦 PKG-{parcel.packageId}
							</h3>
							<button
								className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
								onClick={() =>
									navigate("/admin/parcel-control", {
										state: { parcel },
									})
								}
							>
								Update
							</button>
						</div>

						<p className="text-sm text-gray-700 mb-1">
							<strong>Customer:</strong> {parcel.customer?.name || "N/A"} (
							{parcel.customer?.email || "No Email"})
						</p>
						<p className="text-sm text-gray-700 mb-3">
							<strong>Agent:</strong>{" "}
							{parcel.agent?.name
								? `${parcel.agent.name} (${parcel.agent.email})`
								: "Not Assigned"}
						</p>

						<table className="w-full table-auto border-collapse border border-gray-300 mt-3">
							<thead className="bg-red-100">
								<tr>
									<th className="border px-3 py-2">Status</th>
									<th className="border px-3 py-2">Note</th>
								</tr>
							</thead>
							<tbody>
								{parcel.trackingHistory.map((entry, idx) => (
									<tr key={idx} className="hover:bg-red-50">
										<td className="border px-3 py-2">{entry.status}</td>
										<td className="border px-3 py-2">{entry.note || "—"}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				))
			)}
		</div>
	);
};

export default Alert;
