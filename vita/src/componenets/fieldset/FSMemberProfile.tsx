/**
 * 컴포넌트 : 필드셋 - 회원 프로필
 */

export default function FieldsetMemberProfile () {

  return(<>
    
    <fieldset>
      {/* 카드 제목 */}
      <legend>
        <div className="form-heading">
          <h2>유저 프로필</h2>
        </div>
      </legend>


      <div className="p-3 bg-white rounded shadow my-2">
        <h2 className="mb-3">유저</h2>
        <table className="table w-100 w-sm-66 mx-auto text-start small">
          <tbody>
          {/* 유저정보 : 아이디 */}
            <img src="" alt="유저이미지" />


          </tbody>
        </table>
      </div>



    </fieldset>
  
  </>);
};