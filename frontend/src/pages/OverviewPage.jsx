import { useSelector } from "react-redux";
import {
	useGetMonthlyQuery,
	useGetOverviewQuery,
} from "../slices/transactionSlice";
import { PiPiggyBank } from "react-icons/pi";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import Loader from "../components/Loader";

const OverviewPage = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const { data, isLoading, error } = useGetOverviewQuery();
	const {
		data: monthlyData,
		isLoading: monthlyIsLoading,
		error: monthlyError,
	} = useGetMonthlyQuery();


	return (
		<div className="md:mx-5">
			<div>
				<h1 className="text-4xl font-semibold mb-2">
					Hi, {userInfo.username}{" "}
				</h1>
				<p className="text-base">
					Here's whats happpening with your money. Let's manage your finances.
				</p>
			</div>

			{isLoading || monthlyIsLoading ? (
				
					<h1 className="mt-5">Loading</h1>
				
			) : (
				<div className="mt-5">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-gradient-to-r from-lime-400 to-lime-500  py-5 px-8 border border-gray-300 shadow-lg rounded-lg flex items-center justify-between">
							<div>
								<h1 className="text-lg">Balance</h1>
								<p className="text-2xl font-bold">$ {data.totalBalance} </p>
							</div>
							<PiPiggyBank size={35} />
						</div>

						<div className="bg-gray-50 hover:bg-slate-100 py-5 px-8 border border-gray-300 shadow-lg rounded-lg flex items-center justify-between">
							<div>
								<h1 className="text-lg">Income</h1>
								<p className="text-2xl font-bold">
									$ {monthlyData.income}
									<span className="text-base font-light ml-2 block xl:inline">this month</span>
								</p>
                </div>
                <FaLongArrowAltUp size={35} style={{color: "limegreen"}}/>
						</div>

						<div className="bg-gray-50 hover:bg-slate-100 py-5 px-8 border border-gray-300 shadow-lg rounded-lg flex items-center justify-between">
							<div>
								<h1 className="text-lg">Expense</h1>
								<p className="text-2xl font-bold">
									$ {monthlyData.expense}
									<span className="text-base font-light ml-2 block xl:inline">this month</span>
								</p>
                </div>
                <FaLongArrowAltDown size={35} style={{color: "red"}}/>
						</div>
					</div>
				</div>
			)}

			<div className="grid grid-cols-5 my-10 gap-10">
				<div className="col-span-5 lg:col-span-3 bg-gray-50 p-5 border border-gray-300 rounded-lg shadow-lg h-64 md:h-80">
					<LineChart />
				</div>

				<div className="col-span-5 lg:col-span-2 bg-gray-50 p-5 border border-gray-300 rounded-lg shadow-lg h-64 md:h-80">
					{
						monthlyIsLoading ? (
							<Loader />
						) : (
								<>
								<h1 className="text-center text-lg font-semibold">This month</h1>
								<BarChart income={monthlyData.income} expense={monthlyData.expense} />
								</>
						)
					}
				</div>
			</div>

			<div className="grid grid-cols-3 my-10 gap-10">
				<div className="col-span-3 lg:col-span-1 bg-gray-50 p-5 border border-gray-300 rounded-lg shadow-lg h-64 md:h-96">
					
					
					<DoughnutChart />
				
				</div>
			</div>
		</div>
	);
};

export default OverviewPage;
