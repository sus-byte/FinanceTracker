import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const SignupPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [signup, { isLoading }] = useSignupMutation();

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			let resp = await signup({ username, email, password }).unwrap();
			toast.success(resp.message);
			dispatch(setCredentials(resp.user));
			navigate("/");
		} catch (error) {
			toast.error(error.data.error);
		}
	};

	return (
		<div className="min-h-screen flex items-top justify-center bg-white p-5">
			<div className="bg-gray-50 w-full max-w-sm p-10 shadow-lg rounded-lg h-fit mt-5">
				<div className="text-center">
					<h1 className="text-2xl font-semibold">Create your account</h1>
					<p className="mb-5">Please fill in the details to get started</p>
				</div>

				<form onSubmit={submitHandler}>
					<div className="mb-4">
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700"
						>
							Username
						</label>
						<input
							type="text"
							placeholder="Enter username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:border-lime-500 sm:text-sm"
							required
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:border-lime-500 sm:text-sm"
							required
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:border-lime-500 sm:text-sm"
							required
						/>
					</div>

					<button className="bg-lime-500 py-2 px-5 rounded-lg w-full text-lg my-5 hover:bg-lime-600">
						Signup
					</button>

					<span>
						Already have an account?
						<Link className="ml-3 text-lime-600 hover:underline" to={"/signin"}>
							Signin
						</Link>
					</span>
				</form>
			</div>
		</div>
	);
};

export default SignupPage;
