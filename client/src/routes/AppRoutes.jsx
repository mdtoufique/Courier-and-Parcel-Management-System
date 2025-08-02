import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CustomerDashboard from "../pages/customer/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import ParcelBooking from "../pages/customer/ParcelBooking";
import ProtectedRoute from "./ProtectedRoute";
import ParcelControl from "../pages/admin/ParcelControl";
import AgentDashboard from "../pages/agent/Dashboard";
const AppRoutes = () => (
		
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route
				path="/customer/dashboard"
				element={
					<ProtectedRoute allowedRoles={["customer"]}>
						<CustomerDashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/agent/dashboard"
				element={
					<ProtectedRoute allowedRoles={["agent"]}>
						<AgentDashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/dashboard"
				element={
					<ProtectedRoute allowedRoles={["admin"]}>
						<AdminDashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/parcel-control"
				element={
					<ProtectedRoute allowedRoles={["admin"]}>
						<ParcelControl />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/customer/book-parcel"
				element={
					<ProtectedRoute allowedRoles={["customer"]}>
						<ParcelBooking />
					</ProtectedRoute>
				}
			/>
		</Routes>

);

export default AppRoutes;
