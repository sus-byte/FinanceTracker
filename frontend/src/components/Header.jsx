import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png"
import { useState } from "react";
import { useLogoutMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { userLogout } from "../slices/authSlice";

const Header = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const [showMenu, setShowMenu] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logout, { isLoading }] = useLogoutMutation();
	const handleLogout = async () => {
		if (window.confirm('Are you sure?')) {
			try {
				let resp = await logout().unwrap();
				toast.success(resp.message);
				dispatch(userLogout());
				setShowMenu(false);
				navigate("/signin");
			} catch (error) {
				toast.error(error.data.error);
			}
		}
	}

	const navigateProfile = () => {
		setShowMenu(false);
		navigate("/profile");
	}

	return (
		<div className="flex justify-between items-center bg-gray-600 text-white py-3 px-10 ">
			<Link to={"/"}>
				<div className="flex items-center gap-3">
					<img src={Logo} alt="" className="w-7 h-7 rounded-full" />
					<h1 className="text-3xl font-semibold">
						Spendr
						<span className="text-lime-400">.</span>
					</h1>
				</div>
			</Link>

			{userInfo ? (
				
					<div className="relative">
					<button onClick={() => setShowMenu(!showMenu)}>
					<div className="flex items-center gap-2" >
						<FaRegUser />
						<span className="text-lg hidden md:block">{userInfo.username}</span>
						</div>
					</button>
						{
							showMenu && (
								<div className="absolute mt-5 right-0 w-32 bg-gray-600 shadow-lg z-10 rounded-lg py-3">
								<ul className=" text-lg text-center">
									<li className=" px-4 py-2 hover:bg-gray-500 ">
										<button onClick={navigateProfile}>Profile</button>
									
									</li>
									<li className=" px-4 py-2 hover:bg-gray-500 ">
										<button onClick={handleLogout}>Logout</button>
									</li>
									</ul>
								</div>
							)
						}
					</div>
				
			) : (
				<Link to={"/signin"}>
					<div className="flex items-center gap-1">
						<FaRegUser />
						<span className="text-lg hidden md:block">Signin</span>
					</div>
				</Link>
			)}
		</div>
	);
};

export default Header;
