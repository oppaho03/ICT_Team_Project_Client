/**
 * 컴포넌트 : 필드셋 - 회원 정보
 */
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
// << 마이페이지 - 그래프 기능 >>
// Chart.js 모듈 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function FSFuctionChartBar () {

const data = {
  labels: ['월', '화', '수', '목', '금','토','일'],
  datasets: [
    {
      label: '방문자 수',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      enabled: true,
    },
  },
};


  return(<>

        <h3>요일별 사이트 접속 수</h3>
        <Bar data={data} options={options} />
  
  </>);
};