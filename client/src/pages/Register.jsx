import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/api";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
const Register = () => {
	const { user, loading } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
    const [showrPassword, setShowrPassword] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (!loading && user) {
			navigate(`/${user.role}/dashboard`);
		}
	}, [user, loading, navigate]);

	if (loading || user) return null;

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		retypePassword: "",
		phone: "",
	});
	const [regloading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.retypePassword) {
			toast.error("Passwords do not match");
			return;
		}

		setLoading(true);

		try {
			const { retypePassword, ...dataToSend } = formData;
			await registerUser(dataToSend);
			toast.success("Registration successful!");
			setLoading(false);
			navigate("/login");
		} catch (err) {
			setLoading(false);
			const message =
				err.response?.data?.message || "Registration failed";
			toast.error(message);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
				<h2 className="text-3xl font-bold mb-6 text-center">
					Create an Account
				</h2>
				<form onSubmit={handleSubmit} className="space-y-5">
					<input
						type="text"
						name="name"
						placeholder="Full Name"
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={formData.name}
						onChange={handleChange}
					/>

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
						type="tel"
						name="phone"
						placeholder="Phone Number"
						minLength={11}
						pattern="^\+?[0-9]{10,15}$"
						required
						className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={formData.phone}
						onChange={handleChange}
					/>

					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							placeholder="Password"
							required
							minLength={6}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={formData.password}
							onChange={handleChange}
						/>
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute right-3 top-3 text-sm text-blue-600 hover:underline"
						>
							{showPassword ? "Hide" : "Show"}
						</button>
					</div>

					{/* <input
						type="password"
						name="password"
						placeholder="Password"
						required
						minLength={6}
						className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={formData.password}
						onChange={handleChange}
					/> */}
                    <div className="relative">
						<input
							type={showrPassword ? "text" : "password"}
							name="retypePassword"
							placeholder="Retype Password"
							required
							minLength={6}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={formData.retypePassword}
							onChange={handleChange}
						/>
						<button
							type="button"
							onClick={() => setShowrPassword((prev) => !prev)}
							className="absolute right-3 top-3 text-sm text-blue-600 hover:underline"
						>
							{showrPassword ? "Hide" : "Show"}
						</button>
					</div>
					{/* <input
						type="password"
						name="retypePassword"
						placeholder="Retype Password"
						required
						minLength={6}
						className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={formData.retypePassword}
						onChange={handleChange}
					/> */}

					<button
						type="submit"
						disabled={regloading}
						className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
					>
						{regloading ? "Signing Up..." : "Sign Up"}
					</button>
				</form>

				<p className="mt-6 text-center text-gray-600">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-600 hover:underline">
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
