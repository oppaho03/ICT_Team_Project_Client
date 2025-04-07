import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Title,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useEffect, useRef } from 'react';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Title,
  Legend,
);


const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(37, 89, 244)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207, 0.5)'
};





export default function FSFunction02() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    const data = [
      { x: '2025-04-01T09:00:00', y: 50 },
      { x: '2025-04-02T12:00:00', y: -20 },
      { x: '2025-04-03T09:00:00', y: 80 },
      { x: '2025-04-03T18:00:00', y: 20 },
      { x: '2025-04-04T09:00:00', y: -10 },
      { x: '2025-04-04T15:00:00', y: 30 },
      { x: '2025-04-04T19:00:00', y: 70 },
      { x: '2025-04-04T22:00:00', y: 10 },
      { x: '2025-04-05T09:00:00', y: 35 },
      { x: '2025-04-06T09:00:00', y: 99 },
      { x: '2025-04-06T15:00:00', y: 70 },
      { x: '2025-04-06T19:00:00', y: 10 },
    ];

    const chart = new ChartJS(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: '감정',
            data,
            borderColor: CHART_COLORS.red,
            backgroundColor: CHART_COLORS.yellow,
            pointStyle: 'circle',
            pointRadius: 7,
            pointBackgroundColor: CHART_COLORS.blue,
            pointBorderColor: CHART_COLORS.grey,
            tension: 1,
            borderWidth: 7,
            fill: false,
          },
        ],
      },
      options: {
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart',
          // x: { easing: 'easeInOutQuart', duration: 1500, from: NaN },
          // y: { easing: 'easeInOutQuart', duration: 1500, from: NaN },
        },
        animations: {
          tension: {
            duration: 1500,
            easing: 'easeInOutQuad',
            from: 0.8,
            to: 0.4,
            loop: false,
          },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'yyyy-MM-dd',
              },
            },
            title: {
              display: true,
              text: '',
            },
            ticks: {
              source: 'data',
              autoSkip: true,
            },
          },
          y: {
            min: -50,
            max: 120,
            ticks: {
              stepSize: 20,
            },
            title: {
              display: true,
              text: '',
            },
          },
        },
        plugins: {
          tooltip: {
            mode: 'point',
            intersect: false,
            callbacks: {
              title: (tooltipItems) => {
                const rawDate = tooltipItems[0].parsed.x;
                const date = new Date(rawDate);
                return date.toLocaleString();
              },
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (<>
    <h3>감정 지수</h3>
    <p>날짜별 감정 지수</p>
    <canvas ref={chartRef} />
  </>);
}