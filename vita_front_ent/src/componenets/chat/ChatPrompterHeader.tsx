/**
 * 컴포넌트 : 채팅 프롬프트 헤더
 */

import { useSelector } from "react-redux";

import SVGLogo from "../svgLogo"
import { useEffect, useRef } from "react";
import * as Common from "../../../public/assets/js/commons";

declare var gsap: any | undefined; // GSAP 코어 객체

export default function ChatPrompterHeader ( ) {

  // const ui = useSelector( (state: any) => state.ui );
  const prompt = useSelector( (state: any) => state.prompt );

  const helpMessage1Ref = useRef<HTMLHeadingElement>( null );
  const helpMessage2Ref = useRef<HTMLParagraphElement>( null );

  useEffect( () => {

    for( const el of [helpMessage1Ref, helpMessage2Ref] ) {

      if ( ! el.current || el.current.querySelectorAll("span").length ) continue;

      const msg =el.current.textContent ? el.current.textContent : "";
      el.current.innerHTML = Common.toSpannedLine( msg );
    }

  }, [] );


  return (<>
    <div className="chat-prompter-header" >

      <div className="chat-prompter-header-inner">
        {/* 로고 */}
        <div className="app-branding-wrap no-headline">
          <div className="app-branding-outer">
            <div className="app-branding-inner">
              <div className="app-branding"> <SVGLogo /> </div>
            </div>
          </div>
        </div>
      </div> 

      <div className="chat-prompter-header-inner">
        <div className="chat-prompter-help">
          <h2 ref={helpMessage1Ref} className="help-message mb-0">Healthcare AI Chat-Bot</h2>
          <p ref={helpMessage2Ref} className="help-message mb-0">무엇을 도와드릴까요?</p>
        </div>
      </div>
      
    </div>
  </>);
}