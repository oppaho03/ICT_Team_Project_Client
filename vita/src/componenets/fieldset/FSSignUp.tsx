/**
 * 컴포넌트 : 필드셋 - 회원 가입
 */
import * as Commons from "../../../public/assets/js/commons";

import { useContext, useState } from "react";
import InputAddress from "./InputAddress";
import { useNavigate } from "react-router-dom";
import { SignUpFormDataContext } from "../../utils/contexts/contextSignUpFormData";
import * as FetchSignUp from "../../utils/fetchs/fetchSingup";


export default function FieldsetSignUp() {
  const navigate = useNavigate();
 
  const dataContext = useContext( SignUpFormDataContext );
  const [ validatedEmail, setValidatedEmail ] = useState<boolean>(false);
  const [ validatePassword, setValidatePassword ] = useState<boolean>(false);

  const [ toggledSubmit, setToggledSubmit ] = useState<boolean>(false);

  const [gender, setGender] = useState("M");

  /**
   * 이벤트 : 클릭 - "이메일" 인증
   * @param e 
   * @returns 
   */
  const openVerificationByEmail = ( e: React.MouseEvent<HTMLButtonElement> ) => {
    e.preventDefault();

    const form = dataContext.form; // 메인 폼

    const t = e.target;
    const email = dataContext.email;

    if ( email.length ) {
      FetchSignUp.requestAuthCodeByEmail(email, ( resp ) => {

        console.log(resp); // * 디버그용
      
        if ( ! resp ) { // 유효 하지 않은 이메일
          window.modalAlter( "이미 사용 중인 이메일 입니다." );
        }
        else { // 유효한 이메일 
          // 모달 열기
          const btnModalOpner = (t as HTMLButtonElement).nextElementSibling as HTMLButtonElement;
          if ( btnModalOpner ) btnModalOpner.click();
          else window.modalAlter( "인증 팝업을 열 수 없습니다." );
        }
        
      } )
    }
    else window.modalAlter( "이메일을 확인해주세요." );

    return false;
  }

  /**
   * 이벤트: "이메일" 변경 
   * @param e 
   */
  const emailOnChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const t = e.target;

    let value = t.value.trim();
    t.value = value;

    if ( ! Commons.validateValue("email", value ) ) value = "";
    setValidatedEmail( value == "" ? false : true );
    dataContext.email = value; 
  };

  /**
   * 이벤트: "비밀번호" 변경 
   * @param e 
   */
  const pwOnChange = ( e: React.ChangeEvent<HTMLInputElement>  ) => {
    const t = e.target as HTMLInputElement;
    
    const value = t.value.trim();
    t.value = value; 

    // 비밀번호 재확인
    let checked = true;
    const cinput = (t.name == "password" ? t.nextElementSibling : t.previousElementSibling) as HTMLInputElement | null;

    if ( cinput ) {
      const _value = cinput.value.trim();
      cinput.value = _value;
      checked = value == _value; // 비밀번호 재확인
    }
    setValidatePassword( checked );// - 비밀번호 유효성 검사

    // 값 유효성 검사 및 데이터셋 변경
    const isValidation = Commons.validateValue("password", value );
    t.dataset['isValidation'] = isValidation ? "1" : "0";
  }

  /**
   * 이벤트: "생년월일" 변경 
   * @param e 
   */
  const birthOnChange = ( e: React.ChangeEvent<HTMLInputElement>  ) => {
    const t = e.target as HTMLInputElement;
    const value = Commons.filterBirth( t.value.trim() );
    t.value = value // - 생년월일 값 업데이트
  }


  /**
   * 에벤트: "동의" 변경 (체크박스))
   * @param e 
   */
  const accpetOnChange = ( e: React.ChangeEvent<HTMLInputElement>  ) => {

    const t = e.target as HTMLInputElement;
    let toggled = false;

    if ( t.checked ) {
      // - 폼 데이터 검사
      toggled = dataContext.isChecked();

      if ( ! toggled ) t.checked = false;
    }

    setToggledSubmit( toggled );
  } 

  return (<>
    <fieldset>
      <legend>
        <div className="form-heading"><h2>회원가입</h2></div>
      </legend>

      {/* 이메일 */}
      <div className="form-control-field field-email">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label">이메일</label>
        </div>
        <div className="form-control-field__input-container">
          <div className="input-wrap d-flex align-items-center">
            <input type="email" className="form-control" name="email" placeholder="VITA@gmail.com" data-is-verification={ dataContext.email_verification ? 1 : 0 } data-required="1" onChange={emailOnChange}/>
            <button type="button" className="btn btn-outline-primary" disabled={ validatedEmail !== true } onClick={openVerificationByEmail}>인증하기</button>
            <button type="button" data-bs-toggle="modal" data-bs-target="#modal-verification" style={{display: 'none' }}></button>
          </div>

          {/* <div className="form-text">We'll never share your email with anyone else.</div> */}

        </div>
      </div>

      {/* 비밀번호 */}
      <div className="form-control-field field-password">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label">비밀번호</label>
        </div>
        <div className="form-control-field__input-container">
          <div className="input-wrap">
            <input type="password" className="form-control mb-2" name="password" placeholder="****" data-is-validation='0' data-required="1" data-is-verification={ validatePassword === true ? "1" : "0" } onChange={pwOnChange}/>
            <input type="password" className="form-control" name="password_recheck" placeholder="비밀번호 확인" data-is-validation='0' onChange={pwOnChange}/> {/* 비밀번호 (확인)) */}
          </div>
          <div id="emailHelp" className="form-text">
            <ul>
             
              <li>최소 8자 이상</li>
              <li>숫자 및 특수 문자 1개 이상 포함</li>
              { ! validatePassword && <p><small className="text-danger"><i className="fa-solid fa-triangle-exclamation"></i>&nbsp;비밀번호를 확인해주세요.</small></p> }
            </ul>
            
          </div>
        </div>
      </div>

      {/* 이름 */}
      <div className="form-control-field field-name">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label" >이름</label>
        </div>
        <div className="form-control-field__input-container">
          <input type="text" className="form-control" name="name" placeholder="" data-is-validation='0' data-required="1" />
        </div>
      </div>

      {/* 주소 */}
      <div className="form-control-field field-address">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label">주소</label>
        </div>
        <div className="form-control-field__input-container">
          <InputAddress />
        </div>
      </div>

      {/* 닉네임 */}
      <div className="form-control-field field-nickname">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label" >닉네임</label>
        </div>
        <div className="form-control-field__input-container">
          <input type="text" className="form-control" name="nickname"  placeholder="" data-is-validation='0' data-required="1" />
        </div>
      </div>

      {/* 생년월일 */}
      <div className="form-control-field field-birth">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label">생년월일</label>
        </div>
        <div className="form-control-field__input-container">
          <input type="text" className="form-control" name="birth" placeholder="1900-01-01" data-required="1" onChange={birthOnChange}/>
        </div>
      </div>

      {/* 성별 */}
      <div className="form-control-field field-gender">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label">성별</label>
        </div>
        <div className="form-control-field__input-container">
          <div className="d-flex aglin-items-center">
            <div className="form-check me-1">
              <input className="form-check-input" type="radio" name="gender" id="gender-m" value="M" checked={gender === "M"}
    onChange={(e) => setGender(e.target.value)}/> <label className="form-check-label" htmlFor="gender-m">남자</label>
            </div> <div className="form-check ms-1">
              <input className="form-check-input" type="radio" name="gender" id="gender-f" value="F" checked={gender === "F"}
    onChange={(e) => setGender(e.target.value)}/><label className="form-check-label" htmlFor="gender-f" >여자</label>
            </div>
          </div>

        </div>
      </div>

      {/* 개인정책 관리 동의 */}
      <div className="form-control-field field-accpet">
        {/* <div className="form-control-field__label-container">
          <label className="form-control-field__label">성별</label>
        </div> */}
        <div className="form-control-field__input-container">
          <div className="d-flex aglin-items-center">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox" id="checkbox-accpet" value="1" name="accpet" onChange={accpetOnChange}/>
              <label className="form-check-label" htmlFor="checkbox-accpet">이용약관, 개인정보 수집 안내를 확인하고 동의합니다.</label>
            </div>
          </div>

        </div>
      </div>

      {/* 가입하기 버튼 */}
      <div className="form-control-field">
        <div className="form-control-field__input-container">
          <button type="submit" className="btn btn-primary w-100" disabled={ toggledSubmit === false }>가입하기</button>
        </div>
      </div>

    </fieldset>
  </>);
}