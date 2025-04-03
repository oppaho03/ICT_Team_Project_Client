import FieldsetEtcFunction from "../componenets/fieldset/FSEtcFunction";
import FieldsetMemberInfo from "../componenets/fieldset/FSMemberInfo";
import Branding from "../componenets/headline/BrandingForm";

export default function MyPage() {




  //형이 만든 태그와 클래스명
  //! section
  //? div form-wrap
  //form form
  //? div form-header -->브랜딩 로고 붙이기
  //? div form-body --> 여기부터 필드셋이라는 것으로 붙이 셨음
  //ul
  //li

  //! nav option-navbar

return (<>
  <section className="section d-flex flex-column justify-content-center align-items-center" id="mypage">
    {/* 브랜딩 로고 영역 */}
    {/* Memo 브랜딩 영역이 필요할까?? */}
    <div>
      <Branding />
    </div>

    <div className="wrap d-flex flex-row justify-content-center gap-3 ">
      {/* 마이페이지 */}
        {/* 필드셋 : 사용자 정보 */}
        <div className="d-flex flex-column justy gap-3">

          <div className="#">
            <FieldsetMemberInfo />
          </div>
        </div>

        {/* 우측 세로 기능모음 */}
        <div className="d-flex flex-column gap-3">
          {/* 필드셋 : 프로필 정보 */}
          <div>
            <FieldsetEtcFunction />
          </div>
          <div>
            <FieldsetEtcFunction />
          </div>
          <div>
            <FieldsetEtcFunction />
          </div>
        </div>
    </div>

  </section>



</>);

};