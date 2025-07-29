import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CustomerDashboard from "../pages/customer/Dashboard";
import ParcelBooking from "../pages/customer/ParcelBooking";

const AppRoutes = () => (
	<Router>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			{/* <Route
				path="/customer/dashboard"
				element={
					<ProtectedRoute allowedRoles={["customer"]}>
						<CustomerDashboard />
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
			/> */}
			<Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/customer/book-parcel" element={<ParcelBooking />} />
		</Routes>
	</Router>
);

export default AppRoutes;
