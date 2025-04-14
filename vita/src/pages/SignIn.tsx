/**
 * 페이지: 로그인
 */
import * as Commons from "../../public/assets/js/commons";
import * as IS from "../utils/interfaces";

import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { v4 as uuidv4 } from 'uuid';

import * as uiSlice from "../store/uiSlice";
import * as FetchSignIn from "../utils/fetchs/fetchSignIn";

import { Link, useLocation, useNavigate, } from "react-router-dom";
import LoginSNSGoogle from "../componenets/button/LoginSNSGoogle";
import LoginSNSKaKao from "../componenets/button/LoginSNSKaKao";
import FieldsetSignIn from "../componenets/fieldset/FSSignIn";
import Branding from "../componenets/headline/BrandingForm";


export default function SignIn() {

  const dispatch =  useDispatch();

  // uiSlice.setLoading
  
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const mode = params.get( "mode" );

  const redirectUri = import.meta.env.VITE_OAUTH2_REDIRECT_URL; // OAUTH2 - (공통)

  //  상태관리: 팝업 
  const [ childPopup, setChildPopup ] = useState<Window|null>(null);

  const openPopup = ( uri: string ): boolean  => {

    if ( window.opener ) return false;

    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const popup = window.open(
      uri, 
      "oauth_login_popup", 
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
   * 로그인 : 다이렉트 로그인
   * @param e 
   */
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const dataset = new FormData(form);

    const email = dataset.get("email");
    const pwd = dataset.get("password");

    // 비밀번호 불일치시 오류메세지 뿌리기
    if(pwd !== form.password) {
      window.modalAlter( `아이디 또는 비밀번호가 일치하지 않습니다.` );
    }

    if ( ! email || ! pwd ) { // 이메일 또는 비밀번호 값 오류
      let _name = ! email ? "이메일" : "비밀번호";
      // let _input = ! email ? form.email : form.password;
      window.modalAlter( `${_name} 값을 확인해주세요.` );
      return;
    }
    
    FetchSignIn.onSignIn( email.toString(), pwd.toString(), data => {

      if ( data && data.token ) {
        Commons.setSessionStorage( "token", data.token ); // 로그인 결과: 성공
      }
      
      if ( ! window.isLoggedIn() ) return; // 로그인 결과: 실패
      else window.location.replace("/");
    } );
  };

  /**
   * 로그인 : OAuth2 방식 로그인
   * @param datas 
   */
  const onSubmitOAuthToken = ( datas: IS.IDataOAuthTokenPayload ) => {

    FetchSignIn.onSignInByOAuthToken( {
      provider_id: datas.provider_id,
      provider: datas.provider,
      email: datas.email,
      access_token: datas.token.access_token,
      picture: datas.picture,
      name: datas.name,
    }, ( resp ) => {

      let is_loggedin = false;

      if ( resp ) {
        /* SNS 로그인 및 회원 정보 파싱
        */
        let provider: string | null = resp.provider;
        let access_token: string | null = resp.access_token;
        let refresh_token: string | null = resp.refresh_token;

        //  회원정보
        const member = resp.member;
        let token: string | null = ""; // - JWT 토큰
        if ( member ) token = member.token ? member.token : "";

        // 로그인 완료 - 세션 정보
        if ( token && token.length ) {

          
          Commons.setSessionStorage( "token", token ); // 로그인 결과: 성공
          
          // 인증 : 공급업체
          Commons.setSessionStorage( "auth_provider", provider ); 
          // 인증 : 접근 토큰
          Commons.setSessionStorage( "auth_access_token", access_token ); 
          // 인증 : 새로고침 토큰
          Commons.setSessionStorage( "auth_refresh_token", refresh_token );  
          is_loggedin = true;

         if ( window.opener ) {
            Commons.setSessionStorage( "token", token ); 
            window.opener.sessionStorage.setItem("token", token); // 로그인 결과: 성공
            window.opener.sessionStorage.setItem("auth_provider", provider); // 인증 : 공급업체
            window.opener.sessionStorage.setItem("auth_access_token", access_token); // 인증 : 접근 토큰
            window.opener.sessionStorage.setItem("auth_refresh_token", refresh_token); // 인증 : 새로고침 토큰
          }


          // - 윈도우 닫기 및 페이지 초기화
          if ( window.opener ) {
            window.opener.location.replace("/");
            window.close();
          }
          else window.location.replace("/");
        }
        
      }

      if ( ! is_loggedin ) {
        const _modal = window.modalAlter( `<b class="text-danger">유효한 토큰을 발급 받을 수 없습니다</b>. 관리자에게 문의하세요.` );

          // - 팝업 닫힘
          if ( _modal ) window.modalBindClosed( _modal, () => { 
            // - 윈도우 닫기 및 페이지 초기화
            if ( window.opener ) {
              window.opener.location.replace("/");
              window.close();
            }
            else window.location.replace("/");
          } );
          else {
            // - 윈도우 닫기 및 페이지 초기화
            if ( window.opener ) {
              window.opener.location.replace("/");
              window.close();
            }
            else window.location.replace("/");
          }
      } /// ! is_loggedin

    } );
    
  };


  /**
   * 로그인 : 구글 - 인증 토큰 요청
   * @param e 
   */
  const onSignInGoogle = (e: MouseEvent) => {

    if ( window.opener ) return;  // - 팝업에서는 실행되지 않음

    const t = e.target as HTMLButtonElement;

    /* OAUTH2 - 구글 정보 파싱
    */ 
    const baseUri = import.meta.env.VITE_OAUTH2_GOOGLE_BASE_URL;
    const clientId = import.meta.env.VITE_OAUTH2_GOOGLE_CLIENT_ID;
    // const secretKey = import.meta.env.VITE_OAUTH2_GOOGLE_SECRET_KEY;
    const scope = encodeURIComponent( import.meta.env.VITE_OAUTH2_GOOGLE_SCOPE );
    
    /* SNS 로그인 - 인증 코드 요청
    */ 
    let authUri = `${baseUri}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;

    if ( mode && mode == "test" ) 
      authUri = `${redirectUri}?code=testcode&provider=google`// 테스트 코드 ***
    
    openPopup( authUri ); // - 팝업 열기åå
  };

  /**
   * 로그인 : 카카오 - 인증 토큰 요청
   * @param e 
   */
  const onSignInKaKao = (e: MouseEvent) => {
  };


  useEffect(() => {

    /* URL 쿼리 파싱
    */ 
    if ( window.opener ) {

      dispatch( uiSlice.setContents(false) );

      let provider = ""; 
      let code = "";

      const uri = window.location.href;
      const queryString = uri.slice( uri.indexOf('?') + 1 );

      if ( queryString.indexOf( "google" ) !== -1 ) provider = "google";
      else if ( queryString.indexOf( "kakao" ) !== -1 ) provider = "kakao";
      
      if ( provider == "google" ) 
        code = queryString.slice( queryString.indexOf("code=") + 5 );

      code = decodeURIComponent(code);
      
      FetchSignIn.setAuthToken( provider, code ?? "", (resp) => {

        // /* 테스트 코드: 샘플 데이터 
        // */ 
        // code = params.get("code") ?? "";
        // if ( code == "testcode" ) { // 테스트 코드: 새플 데이터
        //   resp = {
        //     provider_id: uuidv4(),
        //     provider: provider,
        //     picture: "https://lh3.googleusercontent.com/a/ACg8ocLFpG2QtJNS19tdH4FEvVPUUm8Fd0BV8uh4pIPh1m4uZAuynA=s96-c",
        //     name: "박윤성",
        //     email: "user01@gmail.com",
        //     token: {
        //       token_type: "Bearer",
        //       id_token: `${code}.${uuidv4()}`,
        //       access_token: `ya29.${code}.${uuidv4()}`,
        //       expires_in: 0
        //     }
        //   };

        // } // code == "testcode"

        if ( ! resp || ( resp && ! resp.provider_id ) ) { // - SNS 로그인 실패

          // - 팝업 열림
          const _modal = window.modalAlter( `<b class="text-danger">유효한 토큰을 발급 받을 수 없습니다</b>. 관리자에게 문의하세요.` );

          // - 팝업 닫힘
          if ( _modal ) window.modalBindClosed( _modal, () => { window.close(); } );
          else window.close(); 

        }
        else {  // - SNS 로그인 성공
          
          onSubmitOAuthToken( resp );
        }

      } );

    } // end if window.opener
    

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
              <li> <div className="form-control-field"><LoginSNSKaKao onClick={onSignInKaKao}/></div> </li>
              <li> <div className="form-control-field"><LoginSNSGoogle onClick={onSignInGoogle}/></div> </li>
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