/**
 * 컴포넌트 : 필드셋 - 회원 가입
 */
import { KeyboardEvent } from "react";
import InputAddress from "./InputAddress";
import axios from "axios";
const protocol = import.meta.env.VITE_SERVER_SSL === '1' ? 'https' : 'http';
const host = import.meta.env.VITE_SERVER_HOST;
const port = import.meta.env.VITE_SERVER_PORT;

const baseURL = `${protocol}://${host}:${port}`;

export default function FieldsetSignUp () {

  /* 필터: 생년월일
  */
  const onFilterBirth = (e:KeyboardEvent) => {
    const t = e.target as HTMLInputElement;
    // const curkey = e.key;
    let value = t.value;
    t.value = value.replace(/[^0-9]/g, "").replace(/^(\d{4})(\d{2})(\d{2}).*/, "$1-$2-$3");
 
  };

  /* 이메일 인증번호 받기 요청 */
  const onEmailVerification = async () => {
    try {
      const response = await axios.get(`${baseURL}/`);
      console.log('인증번호를 발송 했습니다. 이메일을 확인해 주세요!', response.data);
    } catch (error) {
      console.error('인증번호 발송 실패...',error);
    }
  };
    

  return ( <>
    <fieldset> 
      <legend>
        <div className="form-heading">
          <h2>회원가입</h2>
        </div>
      </legend>

      {/* 이메일 */}
      <div className="form-control-field field-email">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label">이메일</label>
        </div>
        <div className="form-control-field__input-container">
          <div className="input-wrap d-flex align-items-center"> 
            <input type="hidden" name="email_verification" value="0"></input>
            <input type="email" className="form-control" name="email" placeholder="VITA@gmail.com" data-is-validation='0' required />
            <button type="button" className="btn btn-outline-primary" 
            onClick={onEmailVerification}
            data-bs-toggle="modal" data-bs-target="#modal-verification">인증하기</button>
          </div>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
      </div> 

      {/* 비밀번호 */}
      <div className="form-control-field field-password">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label">비밀번호</label>
        </div>
        <div className="form-control-field__input-container">
          <div className="input-wrap">
            <input type="password" className="form-control mb-2" name="password" placeholder="****" data-is-validation='0' required />
            <input type="password" className="form-control" name="password_recheck" placeholder="비밀번호 확인" data-is-validation='0' required /> {/* 비밀번호 (확인)) */}
          </div>
          <div id="emailHelp" className="form-text">
            <ul>
              <li>최소 8자 이상</li>
              <li>숫자 및 특수 문자 1개 이상 포함</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 이름 */}
      <div className="form-control-field field-name">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label" htmlFor="name">이름</label>
        </div>
        <div className="form-control-field__input-container">
          <input type="text" className="form-control" name="name" id="name"placeholder="" data-is-validation='0' required />
        </div>
      </div>

      {/* 주소 */}
      <div className="form-control-field field-address">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label">주소</label>
        </div>
        <div className="form-control-field__input-container">
          <div className="input-wrap"> <InputAddress /> </div>
        </div>
      </div>

      {/* 닉네임 */}
      <div className="form-control-field field-nickname">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label" htmlFor="nickname">닉네임</label>
        </div>
        <div className="form-control-field__input-container">
          <input type="text" className="form-control" name="nickname" id="nickname" placeholder="" data-is-validation='0' required />
        </div>
      </div>

      {/* 생년월일 */}
      <div className="form-control-field field-birth">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label">생년월일</label>
        </div>
        <div className="form-control-field__input-container">
          <input type="text" className="form-control" name="birth" placeholder="1900-01-01" data-is-validation='0' required onKeyUp={onFilterBirth}/>
        </div>
      </div>

      {/* 성별 */}
      <div className="form-control-field field-gender">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label">성별</label>
        </div>
        <div className="form-control-field__input-container">
          <div className="d-flex aglin-items-center">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gender" id="gender-m" value="M" /> <label className="form-check-label" htmlFor="gender-m" >남자</label>
            </div> <div className="form-check">
              <input className="form-check-input" type="radio" name="gender" id="gender-f" value="F" /><label className="form-check-label" htmlFor="gender-f" >여자</label>
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
              <input className="form-check-input" type="checkbox" id="checkbox-accpet" value="1" name="accpet" />
              <label className="form-check-label" htmlFor="checkbox-accpet">이용약관, 개인정보 수집 안내를 확인하고 동의합니다.</label>
            </div>
          </div>

        </div>
      </div>

      
      <div className="form-control-field">
        <div className="form-control-field__input-container">
          <button type="submit" className="btn btn-primary w-100" disabled>가입하기</button>
        </div>
      </div>

    </fieldset> 
  </>);
}