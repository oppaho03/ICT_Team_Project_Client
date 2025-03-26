/**
 * 페이지: 로그인
 */

import { Link, Navigate, useSearchParams } from "react-router-dom";
import LoginSNSGoogle from "../componenets/button/LoginSNSGoogle";
import LoginSNSKaKao from "../componenets/button/LoginSNSKaKao";
import FieldsetSignIn from "../componenets/fieldset/FSSignIn";
import Branding from "../componenets/headline/BrandingForm";
import axios from "axios";
import { useEffect } from "react";


export default function SignIn() {

  // 다이랙트 로그인 URL(to STS)
  const baseURL = "http://localhost:8080";

  // 다이랙트 로그인
  const onLogin = async (e: any) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const response = await axios.post(`${baseURL}/test/login`, {
      email: form.email.value,
      password: form.password.value
    });
    
    //출력확인용
    console.log(response.data);
    console.log(form.email.value);
    console.log(form.password.value);
    
  };
  
  
  //SNS(구글) 로그인 URL(to API)
  
  const GOOGLE_CLIENT_ID = '768424863727-grm75230upjmldp7ckhvhk37ue6ef5ce.apps.googleusercontent.com';
  const GOOGLE_REDIRECT_URI = 'https://indirectly-crack-macaque.ngrok-free.app/auth/social/login/google/';
  const GOOGLE_SCOPE = encodeURIComponent('openid email profile');

  //사용자가 로그인 하면 구글로그인페이지로 이동
  //로그인 성공시 redirect_uri로 이동하면서 ?code=xxx이 붙음
  const REDIRECT_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=code&scope=${GOOGLE_SCOPE}&access_type=offline`;
 
  
  
  //구글로그인버튼 클릭시 이동
  const onLoginGoogle = (e: any) => {
    e.preventDefault();
    window.location.href = REDIRECT_URI;
  };
  
  
  //code추출 -> 백엔드로 전송
  const [params] = useSearchParams();
  useEffect(() => {
    //페이지가 ?code=xxx 포함된 상태로 렌더링 되면, useEffect가 code를 읽고, 백엔드 API에 POST
    const code = params.get('code');
    console.log("구글에서 받은 코드: ", code);
    if (code) {// 받은 code가 있다면 이걸 아래 백엔드URI POST로 보낸다.
      // 백엔드는 아마 이 code를가지고 Google에 access_token 요청하고, 사용자 정보를 받아서 로그인 처리를 해준다.
      axios.post(GOOGLE_REDIRECT_URI,
        { code: code },
        { headers: {'Content-Type': 'application/json'} })
        //서버에서 JWT같은 토큰을 응답하면(res.data에 담겨있다) 이걸 localStorage등에 저장하면 로그인 유지가 가능하다.
        //이후 인증이 필요한 API호출에 이 토큰을 헤더에 실어 보내면 된다.
        .then((res : any) => {
          console.log('로그인 성공!', res.data);
          console.log("가져온 코드: ",code);
          localStorage.setItem('access', res.data.access);
          localStorage.setItem('refresh', res.data.refresh);
        }).catch(err => {
          console.error('서버 에러:', err);
        });
    }
  }, []);




  return (<>
    <section className="section d-flex flex-column justify-content-center align-items-center" id="signin">
      <div className="form-wrap">
        <form className="form form-type-modal form-signin" role="form" tabIndex={-1} action="/signin" method="post">

          <div className="form-header">
            <Branding />
          </div>

          <div className="form-body">
            {/* 필드셋 : 로그인 */}
            <FieldsetSignIn onLogin={onLogin}/>

            <hr />

            {/* 필드셋 : SNS 로그인 */}
            <ul className="w-100 list-unstyled sns-login-list">
              <li> <div className="form-control-field"><LoginSNSKaKao /></div> </li>
              <li> <div className="form-control-field"><LoginSNSGoogle onLoginGoogle={onLoginGoogle}/></div> </li>
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