import { GrLineChart } from "react-icons/gr";
import { SlWallet } from "react-icons/sl";
import { GoShieldLock } from "react-icons/go";
import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<>
			<div className="min-h-screen bg-white">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 p-10">
					<div className="order-1 md:order-2">
						<img src="hero.png" alt="" className="w-[90%] h-auto ml-6 mb-10" />
					</div>

					<div className=" order-2 md:order-1 text-black flex flex-col gap-6 justify-center ml-3 md:ml-10">
						<h2 className="text-4xl lg:text-5xl font-bold">
							Take Control Of Your
							<span className="text-lime-500 block mt-3">Finances</span>
						</h2>

						<p className="text-lg lg:text-xl mb-5">
							Easily track your income, expenses, and savings with personalized
							insights and powerful analytics.
						</p>

						<Link to={"/signin?redirect=/dashboard/overview"}>
							<button className="bg-lime-500 py-4 px-8 rounded-lg w-fit text-xl mb-8 hover:bg-lime-600">
								Get Started
							</button>
						</Link>

						<div className="flex flex-col lg:flex-row gap-14 justify-start">
							<div className="flex flex-row lg:flex-col gap-6 items-center">
								<GrLineChart size={40} />
								Expense Tracking
							</div>

							<div className="flex flex-row lg:flex-col gap-6 items-center">
								<SlWallet size={40} />
								Budget Planning
							</div>

							<div className="flex flex-row lg:flex-col gap-6 items-center">
								<GoShieldLock size={40} />
								Secure & Private
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Hero;
