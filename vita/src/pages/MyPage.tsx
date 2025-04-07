import axios from "axios";
import FieldsetEtcFunction from "../componenets/fieldset/FSEtcFunction";
import FieldsetMemberInfo from "../componenets/fieldset/FSMemberInfo";
import Branding from "../componenets/headline/BrandingForm";
import { getHeaders } from "../utils/fetchs/all";
import { useEffect, useState } from "react";

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
      {/* 브랜딩 로고 영역 */}
      {/* Memo 브랜딩 영역이 필요할까?? */}
      <div className="bg-white pt-5 pb-0">
        <Branding />
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

      <div className="width-100">
        {/* 마이페이지 */}
        {/* 필드셋 : 사용자 정보 */}
        <div className="d-flex flex-column justy gap-3">
            <FieldsetEtcFunction />
            <FieldsetEtcFunction />
            <FieldsetEtcFunction />
        </div>
      </div>


    </section>



  </>);

};