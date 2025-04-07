/**
 * 컴포넌트 : 필드셋 - 회원 정보
 */
import { 
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

//<< 함수 시작 >>
export default function ChartChatViews () {
  const [data, setData] = useState<any>(null);
  const [options, setOptions] = useState<any>({});
  
  // 데이타
  useEffect(()=>{
    const getRandom = (min:number, max:number) => 
      Math.floor(Math.random() * (max - min +1)) + min;
  
    const labels = ['월', '화', '수', '목', '금','토','일'];
  
    const newData = {
      labels,
      datasets: [
        {
          label: '조회수',
          data: labels.map(()=> getRandom(5, 100)),
          backgroundColor: 'rgb(37, 89, 244, 0.6)',
        },
      ],
    };
  
    // 차트 옵션
    const newOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
          align: 'end',
        },
        tooltip: {
          enabled: true,
        },
      },
    };
    setData(newData);
    setOptions(newOptions);
  },[]);

  

  // 차트 표시할 곳
  return(<>

        <h3>공개 채팅 조회수</h3>
        {/* Public Chat Views */}
        { data ? <Bar data={data} options={options}/> : <p>로딩 중...</p> }
  
  </>);
};