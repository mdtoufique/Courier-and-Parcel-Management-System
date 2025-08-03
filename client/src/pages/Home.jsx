import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
const FeatureCard = ({ title, desc }) => (
	<div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
		<h3 className="text-xl font-semibold mb-2">{title}</h3>
		<p className="text-gray-600">{desc}</p>
	</div>
);

const Home = () => {
	// const { user, loading } = useAuth();
	// const navigate = useNavigate();
	// useEffect(() => {
	// 	if (!loading && user) {
	// 		navigate(`/${user.role}/dashboard`);
	// 	}
	// }, [user, loading, navigate]);

	// if (loading || user) return null;

	return (
		<div className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-900">
			{/* Hero Section */}
			<section className="text-center py-20 px-4 bg-stone-200 shadow-lg rounded-xl">
  <h1 className="text-4xl md:text-4xl font-extrabold text-blue-700 mb-6">
    🚚 Courier Package Tracking App – Toufique
  </h1>

  <div className="space-y-4 text-lg md:text-xl font-semibold text-gray-800">
    <p>Email: <a href="mailto:mdrehmant@gmail.com" className="text-blue-600 hover:underline">mdrehmant@gmail.com</a></p>
    <p>Phone: <a href="tel:01686597517" className="text-blue-600 hover:underline">01686597517</a></p>
    <p>Portfolio: <a href="https://portfolio-react-nu-nine.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Portfolio</a></p>
  </div>
</section>


			{/* Features Grid */}
			<section className="py-16 px-4 bg-gray-100">
				<h2 className="text-2xl md:text-3xl font-extrabold text-center text-blue-700 mb-10">
					✨ Main Features of the Project ✨
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					<FeatureCard
						title="Real-Time Parcel Tracking"
						desc="Customers receive live parcel updates using Socket.IO and geolocation tracking with automatic status updates from agents."
					/>
					<FeatureCard
						title="Parcel Booking & Editing"
						desc="Customers can book new parcels, select pickup/delivery, payment method, and track the booking lifecycle. Editable until picked up."
					/>

					<FeatureCard
						title="Interactive Admin Dashboard"
						desc="Admins manage all parcels, view full tracking history, assign agents, edit/delete any booking, and get real-time control over operations."
					/>
					<FeatureCard
						title="Delivery Status Timeline"
						desc="Each parcel maintains a complete tracking history including statuses, locations, timestamps, and agent notes."
					/>

					<FeatureCard
						title="Role-Based Access Control"
						desc="Seamless role separation for Admins, Agents, and Customers with JWT authentication and dynamic dashboards for each user type."
					/>
					<FeatureCard
						title="Protected Routes"
						desc="Frontend route protection using React Auth Context for authorized views."
					/>
					<FeatureCard
						title="Modern UI with Tailwind CSS"
						desc="Responsive interface built with Tailwind CSS and modular React components."
					/>
					<FeatureCard
						title="Toast Notifications & Validations"
						desc="User-friendly alerts for form submissions, errors, and parcel status feedback."
					/>
					<FeatureCard
						title="JWT Authentication"
						desc="Secure authentication using JSON Web Tokens with protected API access."
					/>
					<FeatureCard
						title="Agent Location Logging"
						desc="Agents update parcel statuses with live GPS location, notes, and timestamps—automatically stored in the tracking history."
					/>

					<FeatureCard
						title="Socket.IO Live Updates"
						desc="Instant frontend updates on parcel status changes using WebSockets. No manual refresh needed."
					/>

					<FeatureCard
						title="Delivery Status Timeline"
						desc="Each parcel maintains a complete tracking history including statuses, locations, timestamps, and agent notes."
					/>

					<FeatureCard
						title="Email Notifications"
						desc="Automatic email alerts for customers when parcel status changes—powered by a planned integration with EmailJs."
					/>

					<FeatureCard
						title="Secure & Scalable Backend"
						desc="Built with Express and MongoDB, includes data validation, error handling, and secure authentication using JWT."
					/>
				</div>
			</section>
		</div>
	);
};

export default Home;
