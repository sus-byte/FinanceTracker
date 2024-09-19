import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "../slices/userApiSlice";

const ProfilePage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			setEmail(userInfo.email);
			setUsername(userInfo.username);
		}
	}, [userInfo]);

  const [showPassword, setShowPassword] = useState(false);
  
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

	const submitHandler = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      let resp = await updateProfile({ username, email, password });
      toast.success(resp.message);
    } else {
      toast.error('Passwords do not match');
    }
	};

	return (
		<div className="min-h-screen flex items-top justify-center bg-white p-5">
			<div className="bg-gray-50 w-full max-w-sm p-10 shadow-lg rounded-lg h-fit mt-5">
				<h1 className="text-2xl font-semibold text-center mb-4">My Profile</h1>

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

					
						<button onClick={() => setShowPassword(!showPassword)} className="text-sm font-medium text-lime-500 mb-2">
							Change password
						</button>
					

          {showPassword && (
            <>
						<div className="mb-4">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<input
								type="password"
								placeholder="Enter new password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:border-lime-500 sm:text-sm"
								
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-gray-700"
							>
								Confirm password
							</label>
							<input
								type="password"
								placeholder="Enter confirm password "
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:border-lime-500 sm:text-sm"
								
							/>
              </div>
              </>
					)}

					<button
						type="submit"
						className="bg-lime-500 py-2 px-5 rounded-lg w-full text-lg my-5 hover:bg-lime-600"
					>
						Update
					</button>
				</form>
			</div>
		</div>
	);
};

export default ProfilePage;
