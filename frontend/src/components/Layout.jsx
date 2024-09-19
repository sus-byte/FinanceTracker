import { Outlet, Link, NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { MdAttachMoney } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";

const Layout = () => {
	return (
		<>
			<div className="flex min-h-screen">
				{/* Sidebar */}
				<aside className="w-fit bg-gray-50 border border-r-2">
					<nav className="flex flex-col space-y-2 text-lg">
						<NavLink
							to="/dashboard/overview"
							className={({ isActive }) =>
								`flex items-center p-4  hover:bg-lime-500 ${
									isActive ? "bg-lime-500" : ""
								}`
							}
						>
							<RxDashboard />
							<span className="ml-3 hidden lg:block text-base">Overview</span>
						</NavLink>

						<NavLink
							to="/dashboard/transactions"
							className={({ isActive }) =>
								`flex items-center p-4  hover:bg-lime-500 ${
									isActive ? "bg-lime-500" : ""
								}`
							}
						>
							<GrTransaction />
							<span className="ml-3 hidden lg:block text-base">Transactions</span>
						</NavLink>

						<NavLink
							to="/dashboard/budgets"
							className={({ isActive }) =>
								`flex items-center p-4  hover:bg-lime-500 ${
									isActive ? "bg-lime-500" : ""
								}`
							}
						>
							<MdAttachMoney />
							<span className="ml-3 hidden lg:block text-base">Budgets</span>
						</NavLink>
						
					</nav>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-5 bg-white">
					<Outlet />
				</main>
			</div>
		</>
	);
};

export default Layout;
