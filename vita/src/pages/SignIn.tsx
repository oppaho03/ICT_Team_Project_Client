/**
 * 페이지: 로그인
 */

import { Link, useLocation, useNavigate, } from "react-router-dom";
import LoginSNSGoogle from "../componenets/button/LoginSNSGoogle";
import LoginSNSKaKao from "../componenets/button/LoginSNSKaKao";
import FieldsetSignIn from "../componenets/fieldset/FSSignIn";
import Branding from "../componenets/headline/BrandingForm";
import axios from "axios";
import { useEffect } from "react";
import * as Commons from "../../public/assets/js/commons";
const LoginURI = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_LOGIN_URI;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  // 다이랙트 로그인
  const onLogin = async (e: any) => {
    e.preventDefault();
    const form = e.target as any;
    try {
      const response = await axios.post(`${LoginURI}/api/login`, {
        email: form.email.value,
        password: form.password.value
      });
      const data = response.data as {success:number; response:{data:string}}
      if(data.success === 1 ){
        console.log("로그인 성공!")
        console.log(response.data);
        console.log(form.email.value);
        console.log(form.password.value);
        //토큰 세션스토리지에 저장
        Commons.setSessionStorage("token","eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImVtYWlsIjoidGVzdDQ0NEBuYXZlci5jb20iLCJzdWIiOiIzMyIsImlhdCI6MTc0MzA1MTcwMCwiZXhwIjoxNzQzMDUyNjAwfQ.Hp2dtwAUhQF7yIaSwzlItwlnC0M9bXTd7yZ0gfglONs")
        
        console.log(Commons.getSessionStorage)
        
        //홈 화면으로 이동
        navigate("/", {replace:true});
      }
    } catch(error) {
      console.log("로그인 실패", error)
    }
    
  };
  
  
  // 03/27 조금 더 깔끔하게 수정
  //<< SNS로그인(구글) >>
  const SCOPE = encodeURIComponent('openid email profile');
  const GOOGLE_REDIRECT_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&access_type=offline`;

  
  //구글로그인버튼 클릭시 이동
  const onLoginGoogle = (e: any) => {
    e.preventDefault();
    window.location.href = GOOGLE_REDIRECT_URI;
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    
    
    if(code){
      const tokenEndpoint = "https://oauth2.googleapis.com/token";
      const data = {
        code : code,
        client_id : GOOGLE_CLIENT_ID,
        client_secret : GOOGLE_CLIENT_SECRET,
        redirect_uri : REDIRECT_URI,
        grant_type : "authorization_code",
      };
      


      axios
      .post(tokenEndpoint, data)
      .then((response)=>{
        const data = response.data as{access_token:string; id_token:string};
        const accessToken = data.access_token;
        const idToken = data.id_token;

        console.log("구글에서 받은 엑세스토큰: ", accessToken);
        console.log("구글에서 받은 토큰: ", idToken);
        console.log("사용자 정보: ", response.data);


        const SERVER_REDIRECT_URI = "https://indirectly-crack-macaque.ngrok-free.app/auth/social/login/google/"
      
        console.log("보내기 직전의 code 값:", code);
        axios
        .post(SERVER_REDIRECT_URI,
          { code: code,
            id_token : idToken,
            access_token : accessToken,
            
          },
          { headers: {'Content-Type': 'application/json'} })
          .then((res : any) => {
            console.log('로그인 성공!', res.data);
            console.log("구글에서 받은 코드2: ", code);
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
          }).catch(err => {
            console.error('서버 에러:', err);
          });
        
        navigate("/", {replace:true});
        
      })
      .catch((error)=>{
        console.log("에러발생: ", error);
      });

    }

  }, [location.search]);




  return (<>
    <section className="section d-flex flex-column justify-content-center align-items-center" id="signin">
      <div className="form-wrap">
        <form className="form form-type-modal form-signin" role="form" tabIndex={-1} action="/signin" method="post" onSubmit={onLogin}>

          <div className="form-header">
            <Branding />
          </div>

          <div className="form-body">
            {/* 필드셋 : 로그인 */}
            <FieldsetSignIn />

            <hr />

            {/* 필드셋 : SNS 로그인 */}
            <ul className="w-100 list-unstyled sns-login-list">
              <li> <div className="form-control-field"><LoginSNSKaKao /></div> </li>
              <li> <div className="form-control-field"><LoginSNSGoogle onClick={onLoginGoogle}/></div> </li>
            </ul>

            {/* 필드셋 : SNS 로그인 */}
            <nav className="option-navbar">
              <ul className="w-100 list-unstyled d-flex justify-content-center mb-0">
                <li><Link to="/" className="link link-unstyle">회원 가입</Link></li>
                <li><Link to="/" className="link link-unstyle">비밀번호 찾기</Link></li>
              </ul>
            </nav>

          </div>

        </form>
      </div> {/* form-wrap */}
    </section>

  </>);
};