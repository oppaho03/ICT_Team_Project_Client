/**
 * 페이지: 회원 가입
 */
import FieldsetSignUp from "../componenets/fieldset/FSSignUp";
import Branding from "../componenets/headline/BrandingForm";

export default function SignUp () {

  return ( <>
    <section className="section d-flex flex-column justify-content-center" id="signup">
      <div className="form-wrap">
        <form className="form form-type-modal form-signup" role="form" tabIndex={-1} action="/signin" method="post"> 

          <div className="form-header">
            <Branding />
          </div>

          <div className="form-body">
            {/* 필드셋 : 로그인 */}
            <FieldsetSignUp />
          </div>

        </form>
      </div> {/* form-wrap */}
    </section>

  </> );
};