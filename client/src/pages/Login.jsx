import { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/api";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
	const navigate = useNavigate();
	const { loading,user, setUser } = useAuth();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [Logloading, setLoading] = useState(false);
	
	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};


	useEffect(() => {
    if (user) {
      
      navigate(`/${user.role}/dashboard`);
    }
  	}, [user, navigate]);

	if(loading || user)
	{
		return null;
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await loginUser(formData);
			localStorage.setItem("token", res.token);
			localStorage.setItem("user", JSON.stringify(res.user));
			setUser(res.user);
			toast.success("Login successful!");

			setLoading(false);

			const role = res.user.role;
			if (role === "admin") {
				navigate("/admin/dashboard");
			} else if (role === "agent") {
				navigate("/agent/dashboard");
			} else {
				navigate("/customer/dashboard");
			}
		} catch (err) {
			setLoading(false);
			const message = err?.response?.data?.message || "Login failed";
			console.log(err);
			toast.error(message);
		}
	};

	return (
		<div className="bg-red-600 min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
				<h2 className="text-3xl font-bold mb-6 text-center">
					Login to Your Account
				</h2>

				<form onSubmit={handleSubmit} className="space-y-5">
					<input
						type="email"
						name="email"
						placeholder="Email address"
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={formData.email}
						onChange={handleChange}
					/>

					<input
						type="password"
						name="password"
						placeholder="Password"
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={formData.password}
						onChange={handleChange}
					/>

					<button
						type="submit"
						disabled={Logloading}
						className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
					>
						{Logloading ? "Logging in..." : "Login"}
					</button>
				</form>

				<p className="mt-6 text-center text-gray-600">
					Don't have an account?{" "}
					<Link
						to="/register"
						className="text-blue-600 hover:underline"
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
