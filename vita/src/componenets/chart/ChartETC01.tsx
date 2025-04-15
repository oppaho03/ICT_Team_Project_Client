import React, { useEffect, useState } from 'react';
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
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ChartETC01() {
  const [positiveScores, setPositiveScores] = useState<{ x: string; y: number }[]>([]);
  const [negativeScores, setNegativeScores] = useState<{ x: string; y: number }[]>([]);

  const getCharData = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const res: any = await axios.get('http://localhost:8080/api/posts/meta/sar', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const getChartDataRes = res.data.response.data;

      const pos: { x: string; y: number }[] = [];
      const neg: { x: string; y: number }[] = [];

      getChartDataRes.forEach((item: any) => {
        const createdAt = item.post.post_created_at;
        const scoreMeta = item.meta.find((m: any) => m.key === 'sar_overall_score');
        const rawScore = scoreMeta ? parseFloat(scoreMeta.value) * 100 : 0;

        const score = Math.round(rawScore * 100) / 100; // 소수점 2자리 반올림

        if (score >= 0) {
          pos.push({ x: createdAt, y: score });
        } else {
          neg.push({ x: createdAt, y: score });
        }
      });

      setPositiveScores(pos);
      setNegativeScores(neg);
    } catch (error) {
      console.error('차트 데이터 로딩 실패:', error);
    }
  };

  useEffect(() => {
    getCharData();
  }, []);

  const data = {
    datasets: [
      {
        label: '긍정 점수',
        data: positiveScores,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
      {
        label: '부정 점수',
        data: negativeScores,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end',
      },
      title: {
        display: true,
        text: '감정 점수 (긍/부정)',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'yyyy-MM-dd',
          unit: 'day',
        },
        title: {
          display: true,
          text: '작성일',
        },
      },
      y: {
        title: {
          display: true,
          text: '점수 (%)',
        },
        suggestedMin: -100,
        suggestedMax: 100,
      },
    },
  };

  return (
    <>
      <h3>Vita 감정 점수 (긍/부정)</h3>
      <Line options={options} data={data} />
    </>
  );
}
