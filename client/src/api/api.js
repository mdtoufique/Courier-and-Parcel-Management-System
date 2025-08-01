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
