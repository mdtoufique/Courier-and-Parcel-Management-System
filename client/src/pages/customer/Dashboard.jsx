import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dummyParcels = [
  {
    _id: "PCL123456",
    pickupAddress: "123 Main St, Dhaka",
    deliveryAddress: "456 Market Rd, Chittagong",
    status: "in transit",
    paymentMethod: "cash",
  },
  {
    _id: "PCL123457",
    pickupAddress: "789 Park Ave, Sylhet",
    deliveryAddress: "101 River St, Barisal",
    status: "delivered",
    paymentMethod: "card",
  },
  {
    _id: "PCL123458",
    pickupAddress: "55 Lake View, Rajshahi",
    deliveryAddress: "77 Hill Rd, Khulna",
    status: "pending",
    paymentMethod: "online",
  },
    {
    _id: "PCL123456",
    pickupAddress: "123 Main St, Dhaka",
    deliveryAddress: "456 Market Rd, Chittagong",
    status: "in transit",
    paymentMethod: "cash",
  },
  {
    _id: "PCL123457",
    pickupAddress: "789 Park Ave, Sylhet",
    deliveryAddress: "101 River St, Barisal",
    status: "delivered",
    paymentMethod: "card",
  },
  {
    _id: "PCL123458",
    pickupAddress: "55 Lake View, Rajshahi",
    deliveryAddress: "77 Hill Rd, Khulna",
    status: "pending",
    paymentMethod: "online",
  },
    {
    _id: "PCL123456",
    pickupAddress: "123 Main St, Dhaka",
    deliveryAddress: "456 Market Rd, Chittagong",
    status: "in transit",
    paymentMethod: "cash",
  },
  {
    _id: "PCL123457",
    pickupAddress: "789 Park Ave, Sylhet",
    deliveryAddress: "101 River St, Barisal",
    status: "delivered",
    paymentMethod: "card",
  },
  {
    _id: "PCL123458",
    pickupAddress: "55 Lake View, Rajshahi",
    deliveryAddress: "77 Hill Rd, Khulna",
    status: "pending",
    paymentMethod: "online",
  },
];

useEffect(() => {
  setParcels(dummyParcels);
  setLoading(false);
}, []);
  // useEffect(() => {
  //   const fetchParcels = async () => {
  //     try {
  //       setLoading(true);
  //       setError("");
  //       // Replace with your backend API endpoint
  //       const token = localStorage.getItem("token");
  //       const res = await axios.get("/api/parcels/my", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setParcels(res.data);
  //     } catch (err) {
  //       setError("Failed to fetch parcels.",err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchParcels();
  // }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Parcel Bookings</h1>
        <Link
          to="/customer/book-parcel"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Book New Parcel
        </Link>
      </div>
      {loading && <p>Loading parcels...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && parcels.length === 0 && (
        <p>You have no parcel bookings yet.</p>
      )}

      {!loading && parcels.length > 0 && (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Parcel ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Pickup Address</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Delivery Address</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Payment</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{parcel._id}</td>
                <td className="border border-gray-300 px-4 py-2">{parcel.pickupAddress}</td>
                <td className="border border-gray-300 px-4 py-2">{parcel.deliveryAddress}</td>
                <td className="border border-gray-300 px-4 py-2 capitalize">{parcel.status}</td>
                <td className="border border-gray-300 px-4 py-2 uppercase">{parcel.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
