/**
 * 컴포넌트 : 필드셋 - 회원 가입
 */
export default function FieldsetSignIn () {
  return ( <>
  <fieldset> 
    <legend>
      <div className="form-heading">
        <h2>로그인</h2>
      </div>
    </legend>

    <div className="form-control-field field-email">
      <div className="form-control-field__label-container">
        <label className="form-control-field__label">이메일</label>
      </div>
      <div className="form-control-field__input-container">
        <input type="email" className="form-control" name="email" placeholder="VITA@gmail.com" data-is-validation='0' required />
      </div>
    </div> 

    <div className="form-control-field field-password">
      <div className="form-control-field__label-container">
        <label className="form-control-field__label">비밀번호</label>
      </div>
      <div className="form-control-field__input-container">
        <input type="password" className="form-control" name="password" placeholder="****" data-is-validation='0' required />
      </div>
    </div>

    <div className="form-control-field">
      <div className="form-control-field__input-container">
        <button type="submit" className="btn btn-primary w-100">로그인</button>
      </div>
    </div>

  </fieldset> 
  </>);
}