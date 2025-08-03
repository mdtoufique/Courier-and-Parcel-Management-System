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
import ParcelStateUpdate from "../pages/agent/ParcelStateUpdate";
import TrackingHistory from "../pages/TrackingHistory";
import MoreOptions from "../pages/admin/MoreOptions"
import Alert from "../pages/admin/Alert";
import CustomerAlert from "../pages/customer/Alert";
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
				path="/agent/parcel-state-update"
				element={
					<ProtectedRoute allowedRoles={["agent"]}>
						<ParcelStateUpdate />
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
				path="/admin/more-options"
				element={
					<ProtectedRoute allowedRoles={["admin"]}>
						<MoreOptions />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/alert"
				element={
					<ProtectedRoute allowedRoles={["admin"]}>
						<Alert />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/customer/alert"
				element={
					<ProtectedRoute allowedRoles={["customer"]}>
						<CustomerAlert />
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
			
			<Route
				path="/track-parcel"
				element={
					<ProtectedRoute allowedRoles={["admin","customer","agent"]}>
						<TrackingHistory />
					</ProtectedRoute>
				}
			/>
		</Routes>

);

export default AppRoutes;
