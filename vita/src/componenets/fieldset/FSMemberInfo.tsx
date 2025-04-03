/**
 * 컴포넌트 : 필드셋 - 회원 정보
 */

import { useState } from "react";

export default function FieldsetMemberInfo () {

  // 한번 가져와 보기
  axios.get('http://localhost:8080/api/members')
    .then(function (response) {
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    })

  /* const [myData, setMyData] = useState({
  id:id,
  email:email,
  name:name,
  nickname:nickname,
  gender:gender,
  birth:birth,
  address:address,
  
  }); */



  return(<>
    
    <fieldset>
      {/* 카드 제목 */}
      <legend>
        <div className="form-heading">
          <b className="h1 text-center w-25 p-3 ">마이페이지</b>
        </div>
      </legend>



    <div className="bg-white p-3  shadow-sm">
      <img className="img-thumbnail rounded-circle float-start m-3" src="\profiile_test.png" width="128" alt="프로필 이미지" />
      <h1 className="m-3">○○○님 개인정보</h1>
      <button className="btn btn-outline-primary">개인정보 수정</button>
      <table className="table table-borderless m-3 p-3">
          <thead></thead>
          <tbody >
            <tr>
              <th className="text-secondary">아이디</th>
              <td>jeongjs501</td>
              <th>이메일</th>
              <td>jeongjs501@naver.com</td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td>●●●●●●●●●●●●●</td>
              <td><button className="btn btn-outline-primary">비밀번호 변경</button></td>
            </tr>
            <tr>
              <th>성 명</th>
              <td>정종섭</td>
              <th>성 별</th>
              <td>남성</td>
            </tr>
            <tr>
              <th>주 소</th>
              <td>서울시 강동구 상일로 5길 10-9</td>
              <th>상세주소</th>
              <td>101호</td>
            </tr>
          </tbody>
        </table>
    </div>

{/*
<< MEMO >>
타입을 지정하는 것도 필요하네
먼저 사용자가 회원가입한 데이터들을 조회해 온다
useSelector hook?

*/}





      <div className="bg-white rounded shadow p-3 my-4">
        <h2 className="mb-3">유저정보</h2>
        <table className="table">
          <tbody>
            <tr>{/* 유저정보 : 아이디 */}
              <td>
                <img className="img-thumbnail rounded-circle img-fluid " width="128" src="\profiile_test.png" alt="유저이미지" />
              </td>
              <th>아이디</th>
              <td><input type="text" /></td>
            </tr>

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