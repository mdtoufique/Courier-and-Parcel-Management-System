import { useState } from "react";

const ParcelBooking = () => {
  const [formData, setFormData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    parcelType: "",
    paymentMethod: "prepaid",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const parcelTypes = [
    "Documents",
    "Electronics",
    "Clothing",
    "Food",
    "Other",
  ];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Basic validation example
    if (!formData.pickupAddress || !formData.deliveryAddress || !formData.parcelType) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Replace with your API call, e.g. axios.post("/api/parcels", formData);
      await new Promise(res => setTimeout(res, 1000)); // mock async

      setSuccess("Parcel booked successfully!");
      setFormData({
        pickupAddress: "",
        deliveryAddress: "",
        parcelType: "",
        paymentMethod: "prepaid",
      });
    } catch {
      setError("Failed to book parcel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Book a Parcel Pickup</h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium" htmlFor="pickupAddress">Pickup Address</label>
          <textarea
            id="pickupAddress"
            name="pickupAddress"
            rows={3}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter pickup location"
            value={formData.pickupAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="deliveryAddress">Delivery Address</label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            rows={3}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter delivery location"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="parcelType">Parcel Type</label>
          <select
            id="parcelType"
            name="parcelType"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.parcelType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select parcel type</option>
            {parcelTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Payment Method</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              COD
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="prepaid"
                checked={formData.paymentMethod === "prepaid"}
                onChange={handleChange}
              />
              Prepaid
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Booking..." : "Book Parcel"}
        </button>
      </form>
    </div>
  );
};

export default ParcelBooking;
