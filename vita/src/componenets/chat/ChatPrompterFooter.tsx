/**
 * 컴포넌트 : 채팅 프롬프트 헤더
 */

import { useEffect, useRef, useState } from "react";
import * as Common from "../../../public/assets/js/commons";
import * as IF from "../../utils/interfaces";
import * as FetchChatSession from "../../utils/fetchs/fetchChatSession";
import { Link } from "react-router-dom";
import ChatSessionEntry from "../entry/ChatSessionEntry";


declare var gsap: any | undefined; // GSAP 코어 객체

export default function ChatPrompterFooter ( ) {

  const [ chatSessions, setChatSessions ] = useState<IF.IDataChatSession[]>([]);

  useEffect( () => {

    FetchChatSession.findSessions("public", 1, 10, datas => {
      setChatSessions( ! datas ? [] : datas );
    });
    
  }, [] );


  return (<>
    <div className="chat-prompter-footer" >

      <div className="chat-prompter-footer-inner">

        <div className="chat-prompter-footer-content menu-container">

          <hgroup className="menu-container-headline">
            <h2 className="mb-0" itemProp="headline" aria-label="실시간 대화 세션">
              <i className="fa-solid fa-thumbs-up"></i>실시간 대화 세션
            </h2>
          </hgroup>

          <nav className="menu-wrap chat-session-menu-wrap" itemScope itemType="https://schema.org/Navigation">
            <ul className="menu menu-list list-unstyled chat-session-menu entry-card-list" role="menu" itemScope itemType="https://schema.org/ItemList">
              {/* 아이템 생성 */}
              { chatSessions.map( (cs, csi) => {
                  return (
                    <li key={csi} className="menu-item d-flex align-items-center" itemScope itemType="https://schema.org/ListItem" data-count={csi + 1}>

                      <ChatSessionEntry data={cs} />
                      
                    </li>);
                } )
              } 
            </ul>
          </nav>

          <div className="row justify-content-end">
            <Link to={"/chatsessions"} className="btn btn-outline-primary w-auto">
              <i className="fa-solid fa-list me-2"></i>
              <span>더 보기</span>
            </Link>
          </div>

        </div>

      </div>
      
    </div>
  </>);
}