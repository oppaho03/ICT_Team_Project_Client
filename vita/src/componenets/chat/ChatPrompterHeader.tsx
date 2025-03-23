/**
 * 컴포넌트 : 채팅 프롬프트 헤더
 */

import { useSelector } from "react-redux";

import { useEffect, useRef } from "react";
import * as Common from "../../../public/assets/js/commons";
import BrandingNoHeadline from "../headline/BrandingNoHeadline";

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

      {/* 헤더 로고 */}
      <div className="chat-prompter-header-inner"><BrandingNoHeadline /></div>

      {/* 헤더 컨텐츠 */}
      <div className="chat-prompter-header-inner">
        <div className="chat-prompter-help">
          <h2 ref={helpMessage1Ref} className="help-message mb-0">
            Healthcare AI Chat-Bot
          </h2>
          <p ref={helpMessage2Ref} className="help-message mb-0">
            무엇을 도와드릴까요?
          </p>
        </div>
      </div>
      
    </div>
  </>);
}