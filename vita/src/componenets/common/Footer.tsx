/**
 * 컴포넌트 : 풋터 영역
 */

import { useEffect } from "react";
import { useSelector } from "react-redux";
import AnchorMap from "../button/AnchorMap";


// declare var kakao : any | null;

export default function Footer() {

  const UI = useSelector( (state: any) => state.ui );

  useEffect( () => {
    
  }, [] )

  return (<>

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