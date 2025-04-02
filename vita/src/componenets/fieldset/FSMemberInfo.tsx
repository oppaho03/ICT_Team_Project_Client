/**
 * 컴포넌트 : 필드셋 - 회원 정보
 */

export default function FieldsetMemberInfo () {

  return(<>
    
    <fieldset>
      {/* 카드 제목 */}
      <legend>
        <div className="form-heading">
          <h2>마이페이지</h2>
        </div>
      </legend>

      

{/*
<< MEMO >>
타입을 지정하는 것도 필요하네
먼저 사용자가 회원가입한 데이터들을 조회해 온다
useSelector hook?

*/}


      <div className="bg-white rounded shadow p-3 my-4">
        <h2 className="mb-3">유저정보</h2>
        <table className="table mx-start text-end small">
          <tbody>
          {/* 유저정보 : 아이디 */}
            <tr>
              <th className="align-middle">아이디</th>
              <td className="align-middle">
                <input 
                  type="text"
                  name="id"
                  id="id"
                  // onChange={handleChange}
                  // value={myData.userId}
                  readOnly
                  className="form-control bg-light my-2"
                />
              </td>
              {/* 유저정보 : 이메일 */}
              <th className="align-middle">이메일</th>
              <td className="align-middle">
                <input 
                  type="text"
                  name="email"
                  id="email"
                  // onChange={handleChange}
                  // value={myData.userId}
                  readOnly
                  className="form-control bg-light my-2"
                />
              </td>
            </tr>

          {/* 유저정보 : 성 명 */}
          <tr>
              <th className="align-middle">성 명</th>
              <td className="align-middle">
                <input 
                  type="text"
                  name="name"
                  id="name"
                  // onChange={handleChange}
                  // value={myData.userId}
                  readOnly
                  className="form-control bg-light my-2"
                />
              </td>
              {/* 유저정보 : 닉네임 */}
              <th className="align-middle">닉네임</th>
              <td className="align-middle">
                <input 
                  type="text"
                  name="nickname"
                  id="nickname"
                  // onChange={handleChange}
                  // value={myData.userId}
                  readOnly
                  className="form-control bg-light my-2"
                />
              </td>
          </tr>
          
          {/* 유저정보 : 성 별 */}
          <tr>
              <th className="align-middle">성 별</th>
              <td className="align-middle">
                <input 
                  type="text"
                  name="gender"
                  id="gender"
                  // onChange={handleChange}
                  // value={myData.userId}
                  readOnly
                  className="form-control bg-light my-2"
                />
              </td>
              {/* 유저정보 : 생년월일 */}
              <th className="align-middle">생년월일</th>
              <td className="align-middle">
                <input 
                  type="text"
                  name="birth"
                  id="birth"
                  // onChange={handleChange}
                  // value={myData.userId}
                  readOnly
                  className="form-control bg-light my-2"
                />
              </td>
          </tr>
          
          {/* 유저정보 : 주 소 */}
          <tr>
              <th className="align-middle">주 소</th>
              <td className="align-middle">
                <input 
                  type="text"
                  name="address"
                  id="address"
                  // onChange={handleChange}
                  // value={myData.userId}
                  readOnly
                  className="form-control bg-light my-2"
                  />
              </td>
              <th className="align-middle">상세주소</th>
              <td className="align-middle">
                <input 
                  type="text"
                  name="address"
                  id="address"
                  // onChange={handleChange}
                  // value={myData.userId}
                  readOnly
                  className="form-control bg-light my-2"
                  />
              </td>
              
          </tr>
          {/* 유저정보 : 연락처 */}
          {/* 유저정보 : 가입일 */}
          {/* 유저정보 : 업데이트일 */}
          {/* 이거는 작게 표현했으면 좋겠는데 */}
          
          {/* 유저정보 : 메세지 -> 모달?,토스트 같은걸로 */}
















          </tbody>
        </table>
      </div>



    </fieldset>
  
  </>);
};