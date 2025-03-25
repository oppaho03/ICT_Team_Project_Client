/**
 * 페이지: 회원 가입
 */
import FieldsetSignUp from "../componenets/fieldset/FSSignUp";
import Branding from "../componenets/headline/BrandingForm";

export default function SignUp () {

  const onSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement
    console.log(form.address.value);

    form.querySelector
    console.log("0-0d0sa-d-sdsa");
    console.log(form.birth.value);
  };

  return ( <>
    <section className="section d-flex flex-column justify-content-center" id="signup">
      <div className="form-wrap">
        <form className="form form-type-modal form-signup" role="form" tabIndex={-1} action="/signin" method="post" onSubmit={onSubmit}> 

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