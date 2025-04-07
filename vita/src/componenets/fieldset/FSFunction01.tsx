import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title:{
      display: true,
      text : 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {label: 'VitaUp',
      data: labels.map(() => faker.number.int({min:-1000,max:1000})),
      borderColor : 'rgb(255, 99, 132)',
      backgroundColor : 'rgba(255, 99, 132, 0.5)',
    },
    {label: 'VitaDN',
      data: labels.map(() => faker.number.int({min:-1000,max:1000})),
      borderColor : 'rgb(53, 162, 235)',
      backgroundColor : 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function FSFunction01() {
  return(
    <>

    <h3>Vita Chat - UP/DN</h3>
    <Line options = {options} data={data} />

    </>
  );
}