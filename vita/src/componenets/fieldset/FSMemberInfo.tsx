/**
 * 컴포넌트 : 필드셋 - 회원 정보
 */
import { useState } from "react";

interface UserData {
  email: string;
  name: string;
  nickname: string;
  gender: string;
  birth: string;
  address: string;
  created_at: string;
  meta_value: string;
}

// << 마이페이지 - 필드셋 >>
export default function FieldsetMemberInfo({ email, name, nickname, gender, birth, address, created_at, meta_value }: UserData) {

const profileUrl = meta_value || "/profile_default.png";


  return (<>

    <fieldset >
      {/* 카드 제목 */}
      <legend></legend>

      <div className="p-3 p-md-4">
        <div className="d-flex flex-column flex-md-row justify-content-start align-items-center">
          <img className="img-thumbnail rounded-circle float-start m-3" src={profileUrl} width="128" alt="프로필 이미지" />
          <div className="m-3">
            <span className="h2"><b>{name}</b>님 마이페이지</span><br />
            <button className="btn btn-outline-primary btn-sm ">마이페이지 수정</button>
          </div>
          
        </div>

        <div className="container">
          <div className="row g-3">
            <div className="col-12 col-md-12">
              <div className="bg-white p-3 rounded shadow-sm">
                <strong className="h5">이메일</strong>
                <div>{email}</div>
              </div>
            </div>

            <div className="col-12 col-md-6" style={{ display :"none"}}>
              <div className="bg-white p-3 rounded shadow-sm" >
                <strong className="h5">비밀번호</strong>
                <div >●●●●●●●●●</div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="bg-white p-3 rounded shadow-sm">
                <strong className="h5">성 명</strong>
                <div>{name}</div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="bg-white p-3 rounded shadow-sm">
                <strong className="h5">성 별</strong>
                <div>{gender}</div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="bg-white p-3 rounded shadow-sm">
                <strong className="h5">닉네임</strong>
                <div>{nickname}</div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="bg-white p-3 rounded shadow-sm">
                <strong className="h5">생년월일</strong>
                <div>{birth}</div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="bg-white p-3 rounded shadow-sm">
                <strong className="h5">주 소</strong>
                <div>{address}</div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="bg-white p-3 rounded shadow-sm">
                <strong className="h5">가입일</strong>
                <div>{created_at.split('T')[0]}</div>
              </div>
            </div>

          </div>
        </div>


      </div>

    </fieldset>

  </>);
};