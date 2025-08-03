import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSocket } from "../api/socket";
import moment from "moment";
import { format } from "date-fns";

const TrackingHistory = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const parcel = state?.parcel;

  const [tracking, setTracking] = useState(parcel?.trackingHistory || []);

  useEffect(() => {
    const socket = getSocket();

    const onUpdate = (updatedParcel) => {
      if (updatedParcel._id === parcel._id) {
        setTracking(updatedParcel.trackingHistory);
      }
    };

    socket.off("parcelUpdated", onUpdate);
    socket.on("parcelUpdated", onUpdate);

    return () => {
      socket.off("parcelUpdated", onUpdate);
    };
  }, [parcel._id]);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Tracking History: PKG - {parcel.packageId}
      </h1>

      {tracking.length === 0 ? (
        <p className="text-center text-gray-600">No tracking updates available.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Timestamp</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {tracking.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{entry.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {format(new Date(entry.timestamp), "PPpp")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry.location?.lat}, {entry.location?.lng}
                </td>
                <td className="border border-gray-300 px-4 py-2">{entry.note || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="bg-gray-600 text-white px-5 py-2 rounded hover:bg-gray-800"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TrackingHistory;
