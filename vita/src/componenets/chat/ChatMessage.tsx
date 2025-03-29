/**
 * 컴포넌트 : 채팅 메시지 
 */
// import shortid from 'shortid';

import React from "react";
import Loader from "../common/Loader";


/* 컴포넌트 속성 인터페이스
*/
interface IProp {
  ref?: any, // - useRef
  type?: string,
  status?: string, 
  message?: string | null,
}

/* 컴포넌트 속성 초기화
*/ 
const PropDefault = {
  ref: null,
  type: "bot",
  status: "pending", // pending | fulfilled | rejected"
  message: null,
} as IProp;

export default function ChatMessage ( props: IProp ) {

  props = { ...PropDefault, ...props }; // 컴포넌트 속성 초기화
  
  return (<>
    <div { ...( props.ref ? { ref: props.ref } : {}) } className="chat-content-item chat-message-wrap" data-type={ props.type }> 
      <div className="chat-message">

        <article className="chat-message d-flex flex-column" itemScope itemProp="message" itemType="https://schema.org/Message" data-status={ props.status }>  


        { ( props.type == "bot" ) && <React.Fragment>

          {/* 채팅 메시지 : 메타 (Top) */}
          <div className="chat-message-row chat-message-row-meta meta-top">
            <div className="chat-term term-type-category"></div>
          </div>

          {/* 채팅 메시지 : 헤드 */}
          <div className="chat-message-row chat-message-row-head d-flex align-items-start">
            <div className="chat-message__thumb flex-shrink-0 flex-grow-0">
              <a> <i className="im im-ict icon-brain-1 chat-message__thumb-img"></i></a>
            </div>
            <div className="chat-message__content"> 
              <div className="chat-message__content-mbox type-bubble rounded">
                { props.message && 
                  <p aria-label="message">{ props.message }</p>
                }
                { props.message == null && 
                  <div aria-label="message message-pending"><Loader /></div> 
                }
              </div>
            </div>
          </div>

          {/* 채팅 메시지 : 바디 */}
          <div className="chat-message-row chat-message-row-body d-flex align-items-start">
            <div className="chat-message__content "> 
              <div className="chat-message__content-mbox px-0"></div>
            </div>
          </div>

          {/* 채팅 메시지 : 메타 (Bottom) */}
          <div className="chat-message-row chat-message-row-meta meta-bottom">
            {/* <div className="chat-info-wrap"> */}
              {/* <div className="chat-info info-type-video">
                <h3 className="chat-info__title" itemProp="headline">
                  <i className="fa-brands fa-youtube"></i>유튜브 영상
                </h3>
              </div> */}
            {/* </div> */}
            
          </div>

        </React.Fragment> }
        { ( props.type == "user" ) && <React.Fragment>
          {/* 채팅 메시지 : 메타 (Top) */}
          <div className="chat-message-row chat-message-row-meta meta-top">
            <div className="chat-term term-type-category">
               {/* <span className="chat-term-item" data-id="0">질문</span> */}
            </div> 
          </div>

          {/* 채팅 메시지 : 헤드 */}
          <div className="chat-message-row chat-message-row-head d-flex align-items-start ">
            <div className="chat-message__content "> 
              <div className="chat-message__content-mbox type-bubble rounded">
                {/* <p aria-label="message"></p> */}
              </div>
            </div>
            <div className="chat-message__thumb flex-shrink-0 flex-grow-0">
              <a> <i className="im icon-user chat-message__thumb-img"></i></a>
            </div>
          </div>

          {/* 채팅 메시지 : 메타 (Bottom) */}
          <div className="chat-message-row chat-message-row-meta meta-bottom"></div>

        </React.Fragment> }

        </article>

      </div> {/* chat-message */}
    </div> {/* chat-content-item */}
  </>);
}
