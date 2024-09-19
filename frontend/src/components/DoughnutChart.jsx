import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGetExpenseQuery } from "../slices/transactionSlice";
import Loader from "./Loader";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
	const { data, isLoading, error } = useGetExpenseQuery();

	const [chartData, setChartData] = useState({ labels: [], datasets: [] });

	// Generate a set of colors for the chart
	const generateColors = (num) => {
		const colors = [
			"#FF6384",
			"#36A2EB",
			"#FFCE56",
			"#4BC0C0",
			"#9966FF",
			"#FF9F40",
			"#FFCD56",
			"#FFC107",
			"#D32F2F",
			"#1976D2",
			"#388E3C",
			"#7B1FA2",
		];
		return colors.slice(0, num); // Return only as many colors as needed
	};

	useEffect(() => {
		if (!isLoading && data) {
			const categories = data.map((item) => item._id);
			const expenses = data.map((item) => item.total);

			const backgroundColors = generateColors(categories.length);

			setChartData({
				labels: categories,
				datasets: [
					{
						data: expenses,
						backgroundColor: backgroundColors,
						hoverBackgroundColor: backgroundColors,
					},
				],
			});
		}
	}, [data, isLoading]);

	if (isLoading) return <Loader /> ;
	if (error) return <div>Error loading data</div>;

	return (
		<Doughnut
			data={chartData}
			options={{
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					title: {
						display: true,
						text: "Expenses of the Month",
						color: 'black',
						font: {
							size: 20,
							family: 'SUSE'
						}
					},
					legend: {
						labels: { boxWidth: 15, font: {family: 'SUSE'}},
						
					}
				}
			}}
			
		/>
	);
};

export default DoughnutChart;
