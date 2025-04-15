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
  const [positiveScores, setPositiveScores] = useState<{ x: Date; y: number }[]>([]);
  const [negativeScores, setNegativeScores] = useState<{ x: Date; y: number }[]>([]);

  const getCharData = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const periods = ['2025-04', '2025-05', '2025-06'];
      const requests = periods.map((month)=>
        axios.get('http://localhost:8080/api/voice-files', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            period : month 
          },
        })
        
      );
      
      const responses : any[] = await Promise.all(requests);
      // if ( ! responses.data || ! responses.data.response || ! responses.data.response.data ) return;
      const allData = responses.flatMap(res => res.data.response.data);
      console.log('모든 월 데이터', allData);



      const pos: { x: Date; y: number }[] = [];
      const neg: { x: Date; y: number }[] = [];

      allData.forEach((item: any) => {
        const createdAt = item.post_created_at;

        const sentimentMeta = item.meta.find((m:any) => m.key === 'sar_overall_sentiment');
        const scoreMeta = item.meta.find((m : any) => m.key === 'sar_overall_score');

        const sentiment = sentimentMeta ? sentimentMeta.value : 'NEUTRAL';
        const rawScore = scoreMeta ? parseFloat(scoreMeta.value)*100 : 0;
        const score = Math.round(rawScore * 100) / 100;

        if (sentiment === 'POSITIVE') {
          pos.push({x:new Date(createdAt), y:score});
        } else if (sentiment === 'NEGATIVE') {
          neg.push({x:new Date(createdAt), y: score * -1});
        }
      });

      pos.sort((a, b) => a.x.getTime() - b.x.getTime());
      neg.sort((a, b) => a.x.getTime() - b.x.getTime());

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
    spanGaps:true,
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
          unit: 'month',
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
      <h3>감정-음성 분석 : 월별 (긍/부정)</h3>
      <Line options={options} data={data} />
    </>
  );
}
