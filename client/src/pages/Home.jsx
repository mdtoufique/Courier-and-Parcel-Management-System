import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const FeatureCard = ({ title, desc }) => (
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-white shadow-sm">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Fast, Reliable Courier & Parcel Management
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Book, track, and manage all your parcel deliveries in real-time — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg"
          >
            Sign Up
          </Link>
          <Link
            to="/track"
            className="border border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-xl text-lg"
          >
            Track Package
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title="Real-Time Tracking"
            desc="Track parcels live on the map with accurate location updates."
          />
          <FeatureCard
            title="COD & Prepaid Support"
            desc="Flexible payment options for every customer."
          />
          <FeatureCard
            title="Admin Control"
            desc="Full control over agents, reports, and delivery analytics."
          />
        </div>
      </section>

      
    </div>
  );
};


export default Home;
