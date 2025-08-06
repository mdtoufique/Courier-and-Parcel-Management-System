import { useEffect, useState } from "react";
import {
	fetchUsers,
	fetchAgents,
	fetchParcelsByUser,
	fetchParcelsByAgent,
} from "../../api/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getSocket } from "../../api/socket";
const MoreOptions = () => {
	const [view, setView] = useState(null); // "users" or "agents"
	const [users, setUsers] = useState([]);
	const [agents, setAgents] = useState([]);
	const [selectedPerson, setSelectedPerson] = useState(null);
	const [parcels, setParcels] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedParcel, setSelectedParcel] = useState(null);
	const [tracking, setTracking] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		if (view === "users") {
			loadUsers();
		} else if (view === "agents") {
			loadAgents();
		}
	}, [view]);

	const loadUsers = async () => {
		setLoading(true);
		try {
			const data = await fetchUsers();
			setUsers(data);
		} catch (err) {
			toast.error("Failed to load users");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		const socket = getSocket();

		const onUpdate = (updatedParcel) => {
			if (selectedParcel && updatedParcel._id === selectedParcel._id) {
				setTracking(updatedParcel.trackingHistory);
			}
		};

		socket.off("parcelUpdated", onUpdate);
		socket.on("parcelUpdated", onUpdate);

		return () => {
			socket.off("parcelUpdated", onUpdate);
		};
	}, [selectedParcel]);

	const loadAgents = async () => {
		setLoading(true);
		try {
			const data = await fetchAgents();
			setAgents(data);
		} catch (err) {
			toast.error("Failed to load agents");
		} finally {
			setLoading(false);
		}
	};

	const onSelectPerson = async (person) => {
		setSelectedPerson(person);
		setParcels([]);
		setLoading(true);
		try {
			let parcelsData = [];
			if (view === "users") {
				parcelsData = await fetchParcelsByUser(person._id);
			} else if (view === "agents") {
				parcelsData = await fetchParcelsByAgent(person._id);
			}
			setParcels(parcelsData);
		} catch (err) {
			toast.error("Failed to load parcels");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<div className="flex gap-4 mb-6">
				<button
					className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
						view === "users"
							? "bg-blue-600 text-white shadow-md"
							: "bg-white text-blue-600 border border-blue-600"
					} hover:shadow-lg`}
					onClick={() => {
						setView("users");
						setSelectedPerson(null);
                        setSelectedParcel(null);
						setParcels([]);
					}}
				>
					👤 Show Users
				</button>
				<button
					className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
						view === "agents"
							? "bg-green-600 text-white shadow-md"
							: "bg-white text-green-600 border border-green-600"
					} hover:shadow-lg`}
					onClick={() => {
						setView("agents");
						setSelectedPerson(null);
                        setSelectedParcel(null);
						setParcels([]);
					}}
				>
					👤 Show Agents
				</button>
			</div>

			{loading && <p>Loading...</p>}

			{!loading && view === "users" && (
				<div className="mt-6 bg-white p-4 border rounded shadow">
					<h2 className="text-xl font-semibold mb-4 text-gray-700">Users</h2>
					<div className="overflow-x-auto w-full mb-4">
  						<table className="w-full border-collapse border border-gray-300 rounded">

						<thead className="bg-gray-100">
							<tr>
								<th className="border border-gray-300 px-3 py-1 text-left">
									Name
								</th>
								<th className="border border-gray-300 px-3 py-1 text-left">
									Phone
								</th>
								<th className="border border-gray-300 px-3 py-1 text-left">
									Email
								</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr
									key={user._id}
									className={`cursor-pointer hover:bg-blue-100 ${
										selectedPerson?._id === user._id
											? "bg-blue-200"
											: ""
									}`}
									onClick={() => {
                        setSelectedParcel(null);
						setParcels([]);onSelectPerson(user)}}
								>
									<td className="border border-gray-300 px-3 py-1">
										{user.name}
									</td>
									<td className="border border-gray-300 px-3 py-1">
										{user.phone || "N/A"}
									</td>
									<td className="border border-gray-300 px-3 py-1">
										{user.email}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					</div>
				</div>
			)}

			{!loading && view === "agents" && (
				<div className="mt-6 bg-white p-4 border rounded shadow">
					<h2 className="text-xl font-semibold mb-4 text-gray-700">Agents</h2>
					<div className="overflow-x-auto w-full mb-4">
  						<table className="w-full border-collapse border border-gray-300 rounded">
						<thead className="bg-gray-100">
							<tr>
								<th className="border border-gray-300 px-3 py-1 text-left">
									Name
								</th>
								<th className="border border-gray-300 px-3 py-1 text-left">
									Phone
								</th>
								<th className="border border-gray-300 px-3 py-1 text-left">
									Email
								</th>
							</tr>
						</thead>
						<tbody>
							{agents.map((agent) => (
								<tr
									key={agent._id}
									className={`cursor-pointer hover:bg-blue-100 ${
										selectedPerson?._id === agent._id
											? "bg-blue-200"
											: ""
									}`}
									onClick={() => {
                        setSelectedParcel(null);
						setParcels([]);onSelectPerson(agent)}}
								>
									<td className="border border-gray-300 px-3 py-1">
										{agent.name}
									</td>
									<td className="border border-gray-300 px-3 py-1">
										{agent.phone || "N/A"}
									</td>
									<td className="border border-gray-300 px-3 py-1">
										{agent.email}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					</div>
				</div>
			)}

			{selectedPerson && (
				<div className="mt-6 bg-white p-4 border rounded shadow">
					<h2 className="text-xl font-semibold mb-4 text-gray-700">
						Parcels {view === "users" ? "booked by" : "assigned to"}{" "}
						{selectedPerson.name}
					</h2>
					{parcels.length === 0 ? (
						<p>No parcels found.</p>
					) : (
						<div className="overflow-x-auto w-full">
  						
						<table className="w-full border border-gray-300 rounded">
							<thead className="bg-gray-100">
								<tr>
									<th className="border border-gray-300 px-3 py-1 text-left">
										Parcel ID
									</th>
									<th className="border border-gray-300 px-3 py-1 text-left">
										Pickup
									</th>
									<th className="border border-gray-300 px-3 py-1 text-left">
										Delivery
									</th>
									<th className="border border-gray-300 px-3 py-1 text-left">
										Status
									</th>
								</tr>
							</thead>
							<tbody>
								{parcels.map((parcel) => (
									<tr
										key={parcel._id}
										className={`cursor-pointer hover:bg-blue-100 ${
											selectedParcel?._id === parcel._id ? "bg-blue-200" : ""
										}`}
										onClick={() => {
											setSelectedParcel(parcel);
											setTracking(parcel.trackingHistory);
										}}
									>
										<td className="border border-gray-300 px-3 py-1">{`PKG-${parcel.packageId}`}</td>
										<td className="border border-gray-300 px-3 py-1">
											{parcel.pickupAddress}
										</td>
										<td className="border border-gray-300 px-3 py-1">
											{parcel.deliveryAddress}
										</td>
										<td className="border border-gray-300 px-3 py-1 capitalize">
											{parcel.status}
										</td>
									</tr>
								))}
							</tbody>
						</table>
						</div>
					)}
				</div>
			)}
			{selectedParcel && (
				<div className="mt-6 bg-white p-4 border rounded shadow">
					<h2 className="text-xl font-semibold mb-4 text-gray-700">
						Tracking History: PKG-{selectedParcel.packageId}
					</h2>
					{tracking.length === 0 ? (
						<p>No tracking updates available.</p>
					) : (
						<div className="overflow-x-auto w-full">
						<table className="w-full border-collapse border border-gray-300">
							<thead className="bg-gray-100">
								<tr>
									<th className="border px-3 py-2">Status</th>
									<th className="border px-3 py-2">
										Timestamp
									</th>
									<th className="border px-3 py-2">
										Location
									</th>
									<th className="border px-3 py-2">Note</th>
								</tr>
							</thead>
							<tbody>
								{tracking.map((entry, index) => (
									<tr
										key={index}
										className="hover:bg-gray-100"
									>
										<td className="border px-3 py-2">
											{entry.status}
										</td>
										<td className="border px-3 py-2">
											{new Date(
												entry.timestamp
											).toLocaleString()}
										</td>
										<td className="border px-3 py-2">
											{entry.location?.lat},{" "}
											{entry.location?.lng}
										</td>
										<td className="border px-3 py-2">
											{entry.note || "—"}
										</td>
									</tr>
								))}
							</tbody>
						</table>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default MoreOptions;
