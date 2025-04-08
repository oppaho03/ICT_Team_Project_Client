import axios from "axios";
import FieldsetMemberInfo from "../componenets/fieldset/FSMemberInfo";
import Branding from "../componenets/headline/BrandingForm";
import { getHeaders } from "../utils/fetchs/all";
import { useEffect, useState } from "react";
import ChartEmotionScore from "../componenets/chart/ChartEmotionScore";
import ChartETC01 from "../componenets/chart/ChartETC01";
import ChartChatViews from "../componenets/chart/ChartChatViews";
import ChartETC02 from "../componenets/chart/ChartETC02";

interface UserData {
  id : number;
  email : string;
  name : string;
  nickname : string;
  gender : string;
  birth : string;
  address : string;
  created_at : string;
  meta:{
    meta_value:string;
  }[];
}

// << 마이페이지 >>
export default function MyPage() {
  const [userData, setUserData] = useState<UserData>({
    id:0,
    email: '',
    name: '',
    nickname: '',
    gender: '', 
    birth: '', 
    address: '',
    created_at: '',
    meta:[{
      meta_value: '',
    }],
  });
  const token = getHeaders().Authorization.split(' ')[1];

  const getUserInfo = async () => {
    const res : any= await axios.get('http://localhost:8080/api/members/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const userData = res.data.response.data;
    setUserData(userData);
    console.log('유저정보: ',userData);
    console.log('유저메타데이타: ', userData.meta[0].meta_value)

  };

  // 백엔드로 토큰전달 + 유저정보 가져오기
  useEffect(()=>{
    getUserInfo();
  },[]);

  return (<>
    <section className="section d-flex flex-column justify-content-center align-items-center" id="mypage">
      <div className="d-flex flex-column w-75 gap-3 m-5">
        <div className="bg-white p-1 rounded-3 shadow-sm">
          <div className="pt-5">
            <Branding />
          </div>
          <div className="pb-3">
            <FieldsetMemberInfo
              email={userData.email}
              name={userData.name}
              nickname={userData.nickname}
              gender={userData.gender}
              birth={userData.birth}
              address={userData.address}
              created_at={userData.created_at}
              meta_value={userData.meta[0].meta_value}
              />
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row gap-3">
            <div className="flex-fill bg-white p-3 rounded-3 shadow-sm">
              <ChartEmotionScore/>
            </div>
        </div>

        <div className="d-flex flex-column flex-md-row gap-3">
            <div className="flex-fill bg-white p-3 rounded-3 shadow-sm">
              <ChartChatViews />
            </div>
            <div className="flex-fill bg-white p-3 rounded-3 shadow-sm">
              <ChartETC01/>
            </div>
        </div>
        <div className="d-flex flex-column flex-md-row gap-3">
            <div className="flex-fill bg-white p-3 rounded-3 shadow-sm">
              <ChartETC02 />
            </div>
          
        </div>

      </div>



    </section>



  </>);

};