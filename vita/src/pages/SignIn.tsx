/**
 * 페이지: 로그인
 */
import * as Commons from "../../public/assets/js/commons";

import * as FetchLogin from "../utils/fetchs/fetchLogin";

import { Link, useLocation, useNavigate, } from "react-router-dom";
import LoginSNSGoogle from "../componenets/button/LoginSNSGoogle";
import LoginSNSKaKao from "../componenets/button/LoginSNSKaKao";
import FieldsetSignIn from "../componenets/fieldset/FSSignIn";
import Branding from "../componenets/headline/BrandingForm";

import { FormEvent, useEffect, useState } from "react";


export default function SignIn() {

  const navigate = useNavigate();
  const location = useLocation();

  const redirectUri = import.meta.env.VITE_OAUTH2_REDIRECT_URL; // OAUTH2 - (공통)

  //  상태관리: 팝업 
  const [ childPopup, setChildPopup ] = useState<Window|null>(null);

  const openPopup = ( uri: string ): boolean  => {

    if ( window.opener ) return false;

    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    // if ( childPopup ) childPopup.close(); // - 팝업 창 닫기

    const popup = window.open(
      uri, 
      "VITA - SNS Login", 
      `width=${width},height=${height},top=${top},left=${left}`
    );

    setChildPopup( popup ); // - 팝업 설정
    return true;
  };

  const closePopup = (): boolean => {
    if ( childPopup ) childPopup.close(); // - 팝업 창 닫기
    setChildPopup(null);

    return true;
  };

  /**
   * 로그인 : 다이렉트 
   * @param e 
   */
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const dataset = new FormData(form);

    const email = dataset.get("email");
    const pwd = dataset.get("password");

    if ( ! email || ! pwd ) { // 이메일 또는 비밀번호 값 오류
      let _name = ! email ? "이메일" : "비밀번호";
      // let _input = ! email ? form.email : form.password;
      window.modalAlter( `${_name} 값을 확인해주세요.` );
      return;
    }
    
    FetchLogin.onLogin( email.toString(), pwd.toString(), data => {
   
      if ( data && data.token ) 
        Commons.setSessionStorage( "token", data.token ); // 로그인 결과: 성공

      if ( ! window.isLoggedIn() ) return; // 로그인 결과: 실패
      else window.location.replace("/");
    } );
    
    
  };

  /**
   * 로그인 : 구글 
   * @param e 
   */
  const onLoginGoogle = (e: MouseEvent) => {

    if ( window.opener ) return;  // - 팝업에서는 실행되지 않음

    const t = e.target as HTMLButtonElement;

    /* OAUTH2 - 구글 정보 파싱
    */ 
    const baseUri = import.meta.env.VITE_OAUTH2_GOOGLE_BASE_URL;
    const clientId = import.meta.env.VITE_OAUTH2_GOOGLE_CLIENT_ID;
    // const secretKey = import.meta.env.VITE_OAUTH2_GOOGLE_SECRET_KEY;
    const scope = encodeURIComponent( import.meta.env.VITE_OAUTH2_GOOGLE_SCOPE );
    
    const requestUri = `${baseUri}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;

    openPopup( requestUri ); // - 팝업 열기
      
  };

  /**
   * 로그인 : 카카오
   * @param e 
   */
  const onLoginKaKao = (e: MouseEvent) => {
  };


  useEffect(() => {

    /* URL 쿼리 파싱
    */ 
    const params = new URLSearchParams(location.search);
    

    if ( window.opener ) {
      const code = params.get("code");
      const currentUri = window.location.href;

      FetchLogin.setAuthToken( "google", code ?? "", (resp) => {
        
        console.log(resp);

        console.log("askjdlksad");
        alert("-");
        window.close(); // - 팝업 닫기

      } );

      
    }
    else { // 
      console.log("sajdklasjdas");
    }
    

  }, [location.search] );

  return (<>
    <section className="section d-flex flex-column justify-content-center align-items-center" id="signin">
      <div className="form-wrap">
        <form className="form form-type-modal form-signin" role="form" tabIndex={-1} action="/signin" method="post" onSubmit={onSubmit}>

          <div className="form-header">
            <Branding />
          </div>

          <div className="form-body">
            {/* 필드셋 : 로그인 */}
            <FieldsetSignIn />

            <hr />

            {/* 필드셋 : SNS 로그인 */}
            <ul className="w-100 list-unstyled sns-login-list">
              <li> <div className="form-control-field"><LoginSNSKaKao onClick={onLoginKaKao}/></div> </li>
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