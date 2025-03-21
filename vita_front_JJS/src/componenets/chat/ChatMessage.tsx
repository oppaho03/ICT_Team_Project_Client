/**
 * 컴포넌트 : 채팅 메시지 
 */
// import shortid from 'shortid';

import React from "react";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";

interface IChatMessage {
  type: string,
  message: string | null, 
}
const ChatMessage: React.FC<IChatMessage> = ( prop: IChatMessage ) => {

  const ui = useSelector( (state: any) => state.ui );
  const prompt = useSelector( (state: any) => state.prompt );

  return (<>
    <div className="chat-content-item chat-message-wrap" data-type={prop.type}>
      <div className="chat-message"> 

        {/* 상태 pending | fulfilled | rejected */}
        <article className="chat-message d-flex flex-column" itemScope itemProp="message" itemType="https://schema.org/Message" data-status={ prop.type == "bot" ? "pending" : "fulfilled" }>  

          {/* 채팅 메시지 : 메타 */}
          
          { (prop.type == "sys") && 
            <React.Fragment>
              {/* /* 채팅 메시지 : 메타 */}
              <div className="chat-message-row chat-message-row-meta meta-top">
                <div className="chat-term term-type-category">
                  <span className="chat-term-item" data-id="0">시스템</span>
                </div>
              </div>

              {/* /* 채팅 메시지 : 헤드 */}
              <div className="chat-message-row chat-message-row-head d-flex align-items-start">

                <div className="chat-message__thumb flex-shrink-0 flex-grow-0">
                  <a> <i className="im im-ict icon-brain-1 chat-message__thumb-img"></i></a>
                </div>

                <div className="chat-message__content "> 
                  <div className="chat-message__content-mbox type-bubble rounded">
                    { prop.message && <p aria-label="message">{  prop.message }</p> }
                  </div>
                </div>

              </div>

              {/* /* 채팅 메시지 : 메타 (Bottom) */}
              <div className="chat-message-row chat-message-row-meta meta-bottom"></div>
            </React.Fragment>
          }
          { (prop.type == "user") && 
            <React.Fragment>
              {/* /* 채팅 메시지 : 메타 */}
              <div className="chat-message-row chat-message-row-meta meta-top">
                <div className="chat-term term-type-category">
                  <span className="chat-term-item" data-id="0">질문</span>
                </div>
              </div>

              {/* /* 채팅 메시지 : 헤드 */}
              <div className="chat-message-row chat-message-row-head d-flex align-items-start ">
                <div className="chat-message__content "> 
                  <div className="chat-message__content-mbox type-bubble rounded">
                    { prop.message && <p aria-label="message">{  prop.message }</p> }
                  </div>
                </div>
                <div className="chat-message__thumb flex-shrink-0 flex-grow-0">
                  <a> <i className="im icon-user chat-message__thumb-img"></i></a>
                </div>
              </div>

              {/* /* 채팅 메시지 : 메타 */}
              <div className="chat-message-row chat-message-row-meta meta-bottom">
                {/* <div className="chat-term term-type-keyword">
                  <span className="chat-term-item" data-id="0">질문</span>
                </div> */}
              </div>

            </React.Fragment>
           }
           { (prop.type == "bot") && 
            <React.Fragment>
              {/* /* 채팅 메시지 : 메타 */}
              <div className="chat-message-row chat-message-row-meta meta-top"></div>

              {/* /* 채팅 메시지 : 헤드 */}
              <div className="chat-message-row chat-message-row-head d-flex align-items-start">

                <div className="chat-message__thumb flex-shrink-0 flex-grow-0">
                  <a> <i className="im im-ict icon-brain-1 chat-message__thumb-img"></i></a>
                </div>

                <div className="chat-message__content "> 
                  <div className="chat-message__content-mbox type-bubble rounded">
                    {/* <div aria-label="message message-pending"><Loader /></div>  */}
                  </div>
                </div>

              </div>
              {/* /* 채팅 메시지 : 바디 */}
              <div className="chat-message-row chat-message-row-body d-flex align-items-start">
              <div className="chat-message__content "> 
                  <div className="chat-message__content-mbox"></div>
                </div>
              </div>

              {/* /* 채팅 메시지 : 메타 (Bottom) */}
              <div className="chat-message-row chat-message-row-meta meta-bottom"></div>
            </React.Fragment>
          }


        </article>

      </div>
    </div>
  </>);
};

export default ChatMessage;