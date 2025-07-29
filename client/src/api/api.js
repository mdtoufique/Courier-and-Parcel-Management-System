import axios from "axios";

const API = axios.create({
  baseURL: "/api", 
});

// Auth APIs
export const loginUser = (data) => API.post("/auth/login", data);

export const registerUser = (data) => API.post("/auth/login", data);