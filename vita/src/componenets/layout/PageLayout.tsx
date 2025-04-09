import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import DrawableMenu from "../common/DrawableMenu";
import Footer from "../common/Footer";
import ChatPrompter from "../chat/ChatPrompter";
import BodyClass from "../../utils/bodyClass";
import InputReboot from "../../utils/inputReboot";

import ModalAlter from "../modal/ModalAlter";
import ModalVerification from "../modal/ModalVerification";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";


/**
 * 레이아웃 : 기본 페이지
 */
export default function PageLayout () {

  const UI = useSelector( (state: any) => state.ui );
  // const PROMPT = useSelector( (state: any) => state.prompt );
  
  const [ isVisible, setIsVisible ] = useState<boolean>( UI.contents );

  useEffect( () => {
  }, [] );

  useEffect( () => {
    
    setIsVisible( UI.contents );

  }, [ UI.contents ]);

  return (<>
    <BodyClass />
    <InputReboot />
    <div className={`lyt-grid root${ isVisible ? "" : " d-none" }`}>
      <div className="lyt-grid-item d-flex flex-column" role="section" >
        { /* Header 영역 */ }
        <Header />
        { /* Main 영역 */ }
        <div className="app-content-wrap flex-grow-1 flex-shrink-1">
          <main className="app-content" id="content" role="main">
            <div className="app-content-inner">
              <Outlet />
            </div>
            <ChatPrompter />
          </main>
        </div>
        { /* Footer 영역 */ }
        <Footer />
      </div> { /* lyt-grid-item */ }
      
      <div className="lyt-grid-item" role="section">
        { /* DrawableMenu 영역 */ }
        <DrawableMenu />
      </div> { /* lyt-grid-item */ }

    </div> {/* lyt-grid root */}

    {/* 모달 - 메시지 */}
    <ModalAlter message=""/>
    {/* 모달 - 이메일 인증 */}
    <ModalVerification length={6} />
  </>);
}

 
