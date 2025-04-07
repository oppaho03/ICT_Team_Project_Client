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

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Tooltip, Title, Legend,);

// 차트의 컬러
const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(37, 89, 244)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207, 0.5)'
};

//<< 함수 시작 >>
export default function ChartEmotionScore() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    // 데이터 (x:날짜+시간, y:감정시수)
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

    // 차트 생성
    const chart = new ChartJS(ctx, {
      type: 'line',
      data: {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], //차트의 각 데이터 포인트에 대한 레이블 (x축)
        datasets: [ //차트에 표시되는 데이터 정의
          {
            borderColor: CHART_COLORS.red, //선 색
            borderWidth: 7, //선 굵기
            tension: 1, // 곡선의 부드러움 정도(0:직선, 1에 가까울수록 부드러움)
            fill: false, //선 아래 영역을 채우느냐 여부를 결정(true:채움, false:안채움(기본값), 'origin':0을 기준으로 위/아래 채움 )
            backgroundColor: CHART_COLORS.yellow, //fill: true일 때 채워지는 배경 색상, 또는 바/포인트 내부 색상
            label: '감정', //데이터셋의 레이블 
            data: data, //차트에 표시할 실제 데이터값
            // showLine: false, // 선 없애고 점만 표시
            pointStyle: 'circle', //포인트 모양
            pointRadius: 7, //각 점의 크기  
            pointBackgroundColor: CHART_COLORS.blue, //포인트 안쪽 색상
            pointBorderColor: CHART_COLORS.grey, //포인트 테두리 색상
          },
        ],
      },
      options: {
        //애니메이션 설정
        animation: { //animation: 전체 차트에 적용되는 기본 애니메이션 설정
          duration: 1500,
          easing: 'easeInOutQuart',
          // x: { easing: 'easeInOutQuart', duration: 1500, from: NaN },
          // y: { easing: 'easeInOutQuart', duration: 1500, from: NaN },
        },
        animations: { //animations: 속성별(tension, x, y, radius 등)에 개별 애니메이션을 세밀하게 설정
          tension: {
            duration: 1500,
            easing: 'easeInOutQuad',
            from: 0.8,
            to: 0.4,
            loop: false,
          },
        },
        scales: { //축 설정
          x: {
            type: 'time',
            time: {
              unit: 'day', // x축에는 날짜만 표시(시간은 표시X)
              displayFormats: {
                day: 'yyyy-MM-dd', // 표시 형식 지정
              },
            },
            title: {
              display: true,
              text: '',
            },
            ticks: {
              source: 'data', // 데이터 기준으로 날짜만 보여줌
              autoSkip: true,
            },
          },
          y: {
            min: -50, // y축 최솟값 (아래로)
            max: 120, // y축 최댓값 (위로)
            ticks: {
              stepSize: 20, // 눈금 간격 
            },
            title: {
              display: true,
              text: '',
            },
          },
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
          },
          tooltip: { //그래프 위에 마우스를 올렸을 때 나오는 작은 팝업창 조절
            mode: 'point',
            intersect: false, //false: 마우스가 데이터 포인트 위에 정확히 안 올라도, 가까이만 가면 툴팁이 뜨게 함
            callbacks: {
              title: (tooltipItems) => { //툴팁의 제목 부분을 커스터마이징
                // 마우스 올렸을 때 날짜 + 시간 보이게
                const rawDate = tooltipItems[0].parsed.x;
                const date = new Date(rawDate);
                return date.toLocaleString(); // 브라우저 로케일에 맞게 포맷
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


  {/* 그래프 표시할 곳 */}
  return (<>

    <h3>감정 지수</h3>
    <p>날짜별 감정 지수</p>
    <canvas ref={chartRef} />

  </>);
}