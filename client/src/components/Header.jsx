import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getSocket } from "../api/socket";
import { fetchParcels } from "../api/api";
const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user, logout } = useAuth();
	const [failedCount, setFailedCount] = useState(0);
	const toggleMenu = () => setIsOpen(!isOpen);

	useEffect(() => {
	const loadInitialFailedParcels = async () => {
		try {
			const allParcels = await fetchParcels();
			const failed = allParcels.filter((p) => p.status === "Failed");
			setFailedCount(failed.length);
		} catch (err) {
			console.error("Failed to load parcels");
		}
	};
	loadInitialFailedParcels();

	const socket = getSocket();

	const handleParcelUpdate = async () => {
		try {
			const allParcels = await fetchParcels();
			const failed = allParcels.filter((p) => p.status === "Failed");
			setFailedCount(failed.length);
		} catch (err) {
			console.error("Failed to update failed count.");
		}
	};

	socket.on("parcelUpdated", handleParcelUpdate);

	return () => {
		socket.off("parcelUpdated", handleParcelUpdate);
	};
}, []);

	const navLinks = [];

if (!user) {
	navLinks.push({ to: "/login", label: "Login" });
	navLinks.push({ to: "/register", label: "Register" });
} else {
	navLinks.push({ to: `/${user.role}/dashboard`, label: "Dashboard" });

	if (["admin", "customer"].includes(user.role)) {
		navLinks.push({
		to: `/${user.role}/alert`,
		label: (
			<div className="relative">
				<span>Alerts</span>
				{failedCount > 0 && (
					<span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
						{failedCount}
					</span>
				)}
			</div>
		),
	});
	}

	if (user.role === "admin") {
		navLinks.push({ to: "/admin/more-options", label: "All Info" });
	}
}
	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				<Link to="/" className="text-xl font-bold text-blue-600">
					CourierTracker
				</Link>

				<nav className="hidden md:flex space-x-6 items-center">
					{navLinks.map(({ to, label }) => (
						<NavLink
							key={to}
							to={to}
							className={({ isActive }) =>
								`font-medium bg-stone-200 px-4 py-2 rounded hover:text-blue-600 ${
									isActive
										? "text-blue-700 underline"
										: "text-gray-700"
								}`
							}
						>
							{label}
						</NavLink>
					))}

					{user && (
						<button
							onClick={logout}
							className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
						>
							Logout
						</button>
					)}
				</nav>

				{/* Mobile menu button */}
				<button
					onClick={toggleMenu}
					className="md:hidden focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
					aria-label="Toggle menu"
				>
					<svg
						className="w-6 h-6 text-gray-700"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						{isOpen ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						)}
					</svg>
				</button>
			</div>

			{/* Mobile nav */}
			{isOpen && (
				<nav className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-2">
					{navLinks.map(({ to, label }) => (
						<NavLink
							key={to}
							to={to}
							onClick={() => setIsOpen(false)}
							className={({ isActive }) =>
								`block font-medium hover:text-blue-600 ${
									isActive
										? "text-blue-700 underline"
										: "text-gray-700"
								}`
							}
						>
							{label}
						</NavLink>
					))}

					{user && (
						<button
							onClick={() => {
								logout();
								setIsOpen(false);
							}}
							className="block w-full text-left font-medium text-red-600 hover:underline"
						>
							Logout
						</button>
					)}
				</nav>
			)}
		</header>
	);
};

export default Header;
