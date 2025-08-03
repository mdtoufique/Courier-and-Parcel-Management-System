import { useEffect, useState } from "react";
import { fetchParcels } from "../../api/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getSocket } from "../../api/socket";
const Dashboard = () => {
	const [parcels, setParcels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [statusFilter, setStatusFilter] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
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
		const socket = getSocket();

		socket.off("parcelUpdated");
		socket.on("parcelUpdated", (updatedParcel) => {
			setParcels((prev) =>
				prev.map((p) =>
					p._id === updatedParcel._id ? updatedParcel : p
				)
			);
		});
        
		socket.off("parcelCreated");
		socket.on("parcelCreated", (createdParcel) => {
		setParcels((prev) => [...prev, createdParcel]);
		});


        socket.off("parcelDeleted");
		socket.on("parcelDeleted", () => {
			const tempLoadParcels = async () => {
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

			tempLoadParcels();
		});
		return () => {
			socket.off("parcelUpdated");
			socket.off("parcelCreated");
            socket.off("parcelDeleted")
		};

	}, []);
	useEffect(() => {});

	return (
		<div className="max-w-5xl mx-auto p-6 mt-10">
			<h1 className="text-3xl font-bold mb-8">Admin Parcel Dashboard</h1>
			<div className="flex justify-between items-center mb-6">
				<div>
					<label className="mr-2 font-medium">
						Filter by Status:
					</label>
					<select
						className="border border-gray-300 rounded px-3 py-2"
						onChange={(e) => setStatusFilter(e.target.value)}
						value={statusFilter}
					>
						<option value="">All</option>
						<option value="Booked">Booked</option>
						<option value="Picked Up">Picked Up</option>
						<option value="In Transit">In Transit</option>
						<option value="Delivered">Delivered</option>
						<option value="Failed">Failed</option>
					</select>
				</div>
				<div>
					<label className="mr-2 font-medium">
						Search by ID:{" "}
					</label>
					<input
						type="text"
						placeholder="EX : 7"
						className="w-20 border border-gray-300 rounded px-3 py-2"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
                

			</div>
			{loading && <p>Loading parcels...</p>}

			{!loading && parcels.length === 0 && (
				<p>No parcel bookings found.</p>
			)}

			{!loading && parcels.length > 0 && (
				<div className="overflow-x-auto w-full">
					<table className="w-full table-auto border-collapse border border-gray-300">
						<thead>
							<tr className="bg-gray-100">
								<th className="border border-gray-300 px-4 py-2 text-left">
									Parcel ID
								</th>
								<th className="border border-gray-300 px-4 py-2 text-left">
									Customer Name
								</th>
								<th className="border border-gray-300 px-4 py-2 text-left">
									Agent Name
								</th>
								<th className="border border-gray-300 px-4 py-2 text-left">
									Status
								</th>
								<th className="border border-gray-300 px-4 py-2 text-left">
									Update
								</th>
								<th className="border border-gray-300 px-4 py-2 text-left">
									Tracking
								</th>
							</tr>
						</thead>
						<tbody>
							{parcels
								.filter((parcel) => {
									const matchesStatus = statusFilter
										? parcel.status === statusFilter
										: true;
									const matchesSearch = searchTerm
										? parcel.packageId
												.toString()
												.includes(searchTerm)
										: true;
									return matchesStatus && matchesSearch;
								})
								.map((parcel) => (
									<tr
										key={parcel.packageId}
										className={`${
											parcel.status === "Failed"
												? "bg-red-100 hover:bg-red-200"
												: "hover:bg-gray-200 "
										}`}
									>
										<td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{`PKG - ${parcel.packageId}`}</td>
										<td className="border border-gray-300 px-4 py-2">
											{parcel.customer.name || "N/A"}
										</td>
										<td className="border border-gray-300 px-4 py-2">
											{parcel.agent?.name || "Not Assigned Yet"}
										</td>
										<td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
											{parcel.status}
										</td>
										<td className="border border-gray-300 px-4 py-2">
											<button
												onClick={() =>
													navigate(
														"/admin/parcel-control",
														{
															state: { parcel },
														}
													)
												}
												className="text-blue-600 hover:underline"
											>
												Update Info
											</button>
										</td>
										<td className="border border-gray-300 px-4 py-2">
											<button
												onClick={() =>
													navigate(
														"/track-parcel",
														{
															state: { parcel },
														}
													)
												}
												className="text-blue-600 hover:underline"
											>
												Tracking history
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
