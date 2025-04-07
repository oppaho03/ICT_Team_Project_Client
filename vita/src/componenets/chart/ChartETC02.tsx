import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { getHeaders } from '../../utils/fetchs/all';
import axios from 'axios';
import { useEffect, useState } from 'react';


ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function ChartETC02() {
  
  const [createAtList, setCreateAtList] = useState(null);
  
 useEffect(()=>{

   
   const myData = async () => {
     
    const token = getHeaders().Authorization.split(' ')[1];
    console.log('트큰 확인', token)
    console.log('트큰 확인', `Bearer ${token}`)
    const res: any = await axios.get('http://localhost:8080/api/sessions/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const userData = res.data.response.data;
    console.log('세션데이타', userData);
    const createdAtList = userData.map((item: any) => item.created_at.split('.')[1].slice(0, 2));
    console.log('createdAtList 값: ', createdAtList);
    
    setCreateAtList(createdAtList);
    
  };
  myData();

  // const milliseconds = createdAt.split('.')[1]; // '627318'
  // const decimalPart = milliseconds?.slice(0, 3); // '627'

  // console.log('createdAtList 값', createAtList);
  
},[]);

  
  
  // 랜덤 데이터 생성 함수
  function generateData(count = 16) {
    const data = [];
    
    for (let i = 0; i < count; i++) {
      data.push({
        

        x: faker.number.int({ min: -150, max: 100 }),
        y: faker.number.int({ min: -150, max: 100 }),
        r: faker.number.int({ min: 5, max: 25 }), // bubble의 크기
        
        
      });
    }
    
    return data;
  }

  const data = {
    datasets: [
      {
        label: 'Up/Down Sentiment',
        data: generateData(),
        backgroundColor: 'rgba(37, 89, 244, 0.5)',
        borderColor: 'rgba(37, 89, 244, 1)',
        borderWidth: 1,
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
    scales: {
      x: {
        title: {
          display: true,
          text: 'X 감정 위치',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Y 감정 위치',
        },
      },
    },
  };

  return (
    <>
      <h3>감정 위치 기반 버블 차트</h3>
      <p>감</p>
      <Bubble data={data} options={options} />
    </>
  );
}
