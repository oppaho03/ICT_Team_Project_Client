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
import axios from "axios";
import { FormEvent, useEffect } from "react";

// const LoginURI = import.meta.env.VITE_LOGIN_URI;
// const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
// const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

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

    if ( ! email || ! pwd ) {
      return;
    }
    

    FetchLogin.onLogin( email.toString(), pwd.toString(), data => {

      if ( data && data.token ) {
        // 로그인 결과: 성공
        Commons.setSessionStorage( "token", data.token );
      }

      if ( ! window.isLoggedIn() ) { // 로그인 결과: 실패
        return;
      }

      window.location.replace("/");
    
    } );
    
    
  };

  /**
   * 로그인 : 구글 
   * @param e 
   */
  const onLoginGoogle = (e: MouseEvent) => {
  };

  /**
   * 로그인 : 카카오
   * @param e 
   */
  const onLoginKaKao = (e: MouseEvent) => {
  };
  
  

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    console.log(code);
    

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