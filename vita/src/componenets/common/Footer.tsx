/**
 * 컴포넌트 : 풋터 영역
 */

import { useEffect, useRef, useState } from "react";
import ModalAlter from "../modal/ModalAlter";
import ModalVerification from "../modal/ModalVerification";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import * as Commons from "../../../public/assets/js/commons";
import * as FetchMaps from "../../utils/fetchs/fetchMaps";
import AnchorMap from "../button/AnchorMap";


// declare var kakao : any | null;

export default function Footer() {

  const UI = useSelector( (state: any) => state.ui );
  const dispatch = useDispatch();

  

  const kakao = window.kakao; // 카카오 맵 객체
  const mapContentRef = useRef<HTMLDivElement>(null);
  
  
  useEffect( () => {
    
  }, [] )

  return (<>

    {/* 모달 - 메시지 */}
    <ModalAlter message=""/>

    {/* 모달 - 이메일 인증 */}
    <ModalVerification length={6} />

    <div className="app-footer-wrap">

      {/* 바닥 고정 앵커 버튼 */}
      { UI.map &&  <AnchorMap /> }

      <div className="app-footer-outer">
        
        <div className="app-footer-inner">
          <footer className="app-footer" id="appfoot" role="contentinfo"> <br/> </footer>
        </div> { /* #appfoot*/ }

      </div>
    </div> { /* app-footer-wrap */ }
  </>);
};