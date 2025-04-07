import axios from "axios";
import FieldsetMemberInfo from "../componenets/fieldset/FSMemberInfo";
import Branding from "../componenets/headline/BrandingForm";
import { getHeaders } from "../utils/fetchs/all";
import { useEffect, useState } from "react";
import FSFuctionChartBar from "../componenets/fieldset/FSFuctionChartBar";
import FSFunction01 from "../componenets/fieldset/FSFunction01";
import FSFunction02 from "../componenets/fieldset/FSFunction02";

interface UserData {
  id : number;
  email : string;
  name : string;
  nickname : string;
  gender : string;
  birth : string;
  address : string;
  created_at : string;
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
    console.log(userData);

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
              />
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row gap-3">
            <div className="flex-fill bg-white p-3 rounded-3 shadow-sm">
              <FSFunction02/>
            </div>
        </div>
        
        <div className="d-flex flex-column flex-md-row gap-3">
            <div className="flex-fill bg-white p-3 rounded-3 shadow-sm">
              <FSFuctionChartBar />
            </div>
            <div className="flex-fill bg-white p-3 rounded-3 shadow-sm">
              <FSFunction01/>
            </div>
        </div>

      </div>



    </section>



  </>);

};