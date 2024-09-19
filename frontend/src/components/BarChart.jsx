import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const BarChart = ({ income, expense }) => {
	const [chartData, setChartData] = useState(null);

	useEffect(() => {
		const savings = income - expense;


		setChartData({
			labels: ["Income", "Expenses", "Savings"],
			datasets: [
				{
					data: [income, expense, savings],
					backgroundColor: [
						"rgba(75, 192, 192, 0.6)", // Income color
						"rgba(255, 99, 132, 0.6)", // Expenses color
						"rgba(163, 230, 53, 0.6)", // Savings color
					],
					borderColor: [
						"rgba(75, 192, 192, 1)",
						"rgba(255, 99, 132, 1)",
						"rgba(163, 230, 53, 1)",
					],
					borderWidth: 1,
				},
			],
		});
	}, [income, expense]);

	if (!chartData) {
		return <div>Loading...</div>;
	}

	return (
		<Bar
			data={chartData}
			options={{
				responsive: true,
				maintainAspectRatio: false, 
				plugins: {
					legend: { display: false },
				},
            }}
            className="mb-6"
		/>
	);
};

export default BarChart;
