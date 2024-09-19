import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import {toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const SigninPage = () => {
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || "/"
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let resp = await login({ email, password }).unwrap();
      dispatch(setCredentials(resp.user));
      toast.success(resp.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  }

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo, navigate]);

	return (
		<div className="min-h-screen flex items-top justify-center bg-white p-5">
			<div className="bg-gray-50 w-full max-w-sm p-10 shadow-lg rounded-lg h-fit mt-10">
        <div className="text-center">
        <h1 className="text-2xl font-semibold">Sign in to Spendr.</h1>
				<p className="mb-5">Welcome back! Please sign in to continue</p>
        </div>

				<form onSubmit={submitHandler}>
					<div className="mb-4">
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
						<input
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:border-lime-500 sm:text-sm"
							required
						/>
          </div>
          
          <button type="submit" className="bg-lime-500 py-2 px-5 rounded-lg w-full text-lg my-5 hover:bg-lime-600">
            Signin
          </button>

          <span>
            Don't have an account?
            <Link className="ml-3 text-lime-600 hover:underline" to={"/signup"}>Register now</Link>
          </span>
				</form>
			</div>
		</div>
	);
};

export default SigninPage;
