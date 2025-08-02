import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export async function loginUser(credentials) {
	try {
		const response = await axios.post(`${API_BASE_URL}/api/auth/login`,
			credentials
		);

		return response.data;
	} catch (error) {
		console.error(
			"Error message:",
			error?.response?.data?.message || error.message || error
		);
		throw error;
	}
}
export async function registerUser(data)
{
    try{
		const response = await axios.post(`${API_BASE_URL}/api/auth/register`,
			data
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error message:",
			error?.response?.data?.message || error.message || error
		);
		throw error;
	}
}
export async function fetchParcels(token) {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/parcels`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching parcels:",
      error?.response?.data?.message || error.message || error
    );
    throw error;
  }
}

export async function createParcel(data) {
  try {
	const token =localStorage.getItem("token")
    const res = await axios.post(`${API_BASE_URL}/api/parcels`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error creating parcel:",
      error?.response?.data?.message || error.message || error
    );
    throw error;
  }
}

export async function updateParcel(id, data) {
  try {
	const token =localStorage.getItem("token")
	console.log("hiii from api.js");
    const res = await axios.put(`${API_BASE_URL}/api/parcels/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error updating parcel:",
      error?.response?.data?.message || error.message || error
    );
    throw error;
  }
}

export async function deleteParcel(id) {
  try {
	const token =localStorage.getItem("token")
    const res = await axios.delete(`${API_BASE_URL}/api/parcels/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error deleting parcel:",
      error?.response?.data?.message || error.message || error
    );
    throw error;
  }
}