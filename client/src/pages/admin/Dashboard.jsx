import { useEffect, useState } from "react";
import { fetchParcels } from "../../api/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
    const navigate=useNavigate();
  useEffect(() => {
    const loadParcels = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const fetchedParcels = await fetchParcels(token);
        setParcels(fetchedParcels);
        
      } catch (err) {
        toast.error("Failed to fetch parcels.");
      } finally {
        setLoading(false);
      }
    };

    loadParcels();
  }, []);


  const showDetails = (parcel) => {
    alert(`Parcel Details:
Parcel ID: PKG-${parcel.packageId}
Customer: ${parcel.customerName || "N/A"}
Agent: ${parcel.agentName || "N/A"}
Status: ${parcel.status}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-8">Admin Parcel Dashboard</h1>

      {loading && <p>Loading parcels...</p>}

      {!loading && parcels.length === 0 && (
        <p>No parcel bookings found.</p>
      )}

      {!loading && parcels.length > 0 && (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Parcel ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Agent Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
                
              <tr key={parcel.packageId} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{`PKG-${parcel.packageId}`}</td>
                <td className="border border-gray-300 px-4 py-2">{parcel.customer.name || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{parcel.agent?.name || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => navigate("/admin/parcel-control", { state: { parcel } })}
                    className="text-blue-600 hover:underline"
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
