import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useGetYearQuery } from '../slices/transactionSlice';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const LineChart = () => {

    const { data, isLoading, error } = useGetYearQuery();


    const chartData = React.useMemo(() => {
        if (isLoading) return {}; // Return an empty object while loading
        if (error) return {}; // Handle the error case
    
        const months = data.map((item) => item.month);
        const income = data.map((item) => item.income);
        const expense = data.map((item) => item.expense);
    
        return {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Income',
              data: income,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
            {
              label: 'Expense',
              data: expense,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
            },
          ],
        };
      }, [data, isLoading, error]);


    return isLoading ? (
      <Loader />
    ) : (
            
                <Line data={chartData} options={{responsive: true, maintainAspectRatio: false}} />
            
  )
}

export default LineChart