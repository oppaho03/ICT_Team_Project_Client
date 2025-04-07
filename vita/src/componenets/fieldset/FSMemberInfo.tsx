/**
 * 컴포넌트 : 필드셋 - 회원 정보
 */
import { useState } from "react";

interface UserData {
  email : string;
  name : string;
  nickname : string;
  gender : string;
  birth : string;
  address : string;
  created_at : string;

}
// << 마이페이지 - 필드셋 >>
export default function FieldsetMemberInfo ({email,name,nickname,gender,birth,address,created_at}:UserData){

  return(<>
    
    <fieldset >
      {/* 카드 제목 */}
      <legend></legend>

    <div className="p-5 ">
      <img className="img-thumbnail rounded-circle float-start m-3" src="\profiile_test.png" width="128" alt="프로필 이미지" />
      <h1 className="m-3"><b>{name}</b>님 개인정보</h1>
      <button className="btn btn-outline-primary btn-sm">개인정보 수정</button>
      
      <div className="pt-3">
      <table className="table table-borderless m-5">
          <thead></thead>
          <tbody >
            <tr >
              <th className="h5 pb-3 ">이메일</th>
              <td>{email}</td>
              <th className="h5 pb-3">비밀번호</th>
              <td>{'●●●●●●●●●'} <button className="btn btn-sm btn-outline-primary">비밀번호 변경</button></td>
            </tr>
            <tr >
              <th className="h5 pb-3">성 명</th>
              <td>{name}</td>
              <th className="h5 pb-3">성 별</th>
              <td>{gender}</td>
              {/* <th className="text-secondary">아이디</th> */}
              {/* <td>{email.split('@')[0]}</td> */}
            </tr>
              
              
            <tr>
              <th className="h5 pb-3">닉네임</th>
              <td>{nickname}</td>
              <th className="h5 pb-3">생년월일</th>
              <td>{birth}</td>

            </tr>
            <tr>
              <th className="h5">주 소</th>
              <td>{address}</td>
              <th className="h5">가입일</th>
              <td>{created_at.split('T')[0]}</td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>

    </fieldset>
  
  </>);
};