/**
 * 페이지: 회원 가입
 */
import { useContext, useEffect, useRef } from "react";
import * as Commons from "../../public/assets/js/commons";

import FieldsetSignUp from "../componenets/fieldset/FSSignUp";
import Branding from "../componenets/headline/BrandingForm";
import { SignUpFormDataContext, SignUpFormDataDefaultValue } from "../utils/contexts/contextSignUpFormData";
import * as FetchSignUp from "../utils/fetchs/fetchSingup";
import { useNavigate } from "react-router-dom";

export default function SignUp () {

  const navigate = useNavigate();

  const dataContext =  useContext( SignUpFormDataContext );

  const formRef = useRef<HTMLFormElement>(null);

  useEffect( () => {

    const form = formRef ? formRef.current : null;
    if ( form ) dataContext.form = form;

    /**
     * 폼 데이터 검사 
     * @returns 
     */
    dataContext.isChecked = (): boolean => {
      let checked = true; 

      if ( ! form ) return false;

      // [필수] input 모두 불러오기
      const inputs : NodeListOf<HTMLInputElement> = form.querySelectorAll( 'input[data-required="1"]' );

      for ( const input of inputs ) {

        const _name = input.name;

        if ( ! input.value.trim().length ) checked = false;

        if ( checked &&  ["email", "password"].includes( _name ) === true ) {

          if ( input.dataset['isVerification'] == "0" ) {
            checked = false;
          }
          // else if ( _name === "password" ) { }

        } // end "email", "password"

        if( ! checked ) {
          input.focus();
          break;
        } //

      } // end for
      
      return checked;
    }

  }, [] );

  const onSubmit = (e: any) => {
    e.preventDefault(); // - event cancel
    
    const form = e.target as HTMLFormElement;

    /// 폼 데이터 검사
    if ( ! dataContext.isChecked() ) {
      return; 
    }

    /// 폼 데이터 검사 - 성공
    const formData = new FormData(form); 
    const requestData = new FormData();
    
    for( const [ key, value ] of formData.entries() ) {

      // exclude keys
      if ( ["password_recheck", "accpet"].includes( key ) !== false ) continue;
      else requestData.append(  key, value ); // 데이터 키&값 추가

      if ( key == "email" ) 
        requestData.append( "isEmailAuth", form[key].dataset['isVerification'] );

    }

    FetchSignUp.onSignUp( requestData, (resp) => { // 회원 가입

      if ( ! resp || ! resp.id  ) { // 회원 가입: Failed 
        const modal = window.modalAlter( `회원가입을 완료하지 못했습니다. <br> 관리자에게 문의 또는 잠시 후 다시 시도해주세요.` );
      }
      else {  // 회원 가입: Success
        const modal = window.modalAlter( `"<b class="text-info">${resp && resp.email ? resp.email : '-'}</b>" 님 반갑습니다. 회원가입이 성공적으로 완료 되었습니다.` );

        if ( modal ) window.modalBindClosed( modal, () => { navigate("/"); } );
      }

    } );

  };

  return ( <>
    <section className="section d-flex flex-column justify-content-center" id="signup">
      <div className="form-wrap">
        <form ref={formRef} className="form form-type-modal form-signup" role="form" tabIndex={-1} action="/signin" method="post" onSubmit={onSubmit}> 

          <div className="form-header">
            <Branding />
          </div>

          <div className="form-body">

            <SignUpFormDataContext.Provider value={ SignUpFormDataDefaultValue }>
              {/* 필드셋 : 로그인 */}
              <FieldsetSignUp />
            </SignUpFormDataContext.Provider>

          </div>

        </form>
      </div> {/* form-wrap */}
    </section>

  </> );
};