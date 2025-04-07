/**
 * 페이지: 로그인
 */
import * as Commons from "../../public/assets/js/commons";
import * as IF from "../utils/interfaces";

import { FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { v4 as uuidv4 } from 'uuid';

import * as uiSlice from "../store/uiSlice";

import * as FetchChatSession from "../utils/fetchs/fetchChatSession";
import ChatSessionEntry from "../componenets/entry/ChatSessionEntry";
import BlockNotFound from "../componenets/headline/BlockNotFound";
import ContentHeadline from "../componenets/headline/ContentHeadline";




export default function ChatSessions() {

  const UI = useSelector( (state: any) => state.ui );
  const dispatch =  useDispatch();

  const [ chatSessions, setChatSessions ] = useState<IF.IDataChatSession[]>([]);
  const [ lastPaged, setLastPaged ] = useState<boolean>(false);
  

  let entries = [] as IF.IDataChatSession[];


  const wrapper = document.getElementById("wrapper");
  let paged = 1;
  let count = "1";

  

  /**
   * #wrapper 스크롤 (페이징)
   * @param e 
   * @returns 
   */
  const onScroll = ( e: any ) => {
    
    const t = e.target as HTMLDivElement;

    if ( window.isScrollYEnded(t) ) {
      if ( paged > 0 ) updateChatSessions();
    }

  };

  /**
   * 
   */
  const updateChatSessions = () => {

    FetchChatSession.findSessions("public", paged, 10, datas => {

      if ( ! datas ) datas = []; 
      
      entries = entries.concat( datas );
      setChatSessions( entries );

      if ( ! datas || ! datas.length ) paged = -1;
      else paged ++;

      setLastPaged( paged < 1 ? true : false );

    });

  };

  

  useEffect(() => {

    if ( wrapper ) {
      Commons.setEventListener(wrapper, "scroll", onScroll, {});
    }

    updateChatSessions();

    return () => {
      if ( wrapper ) {
        Commons.resetEventListener(wrapper, "scroll", onScroll);
      }
    }
    
  }, [] );

  return (<>
    <section className="section d-flex flex-column justify-content-center align-items-center" id="chat-sessions">

      <div className="container">

        <ContentHeadline title={"공개 채팅 세션 목록"} />

        <div className="content content-list" id="chat-sessions-list">
          <nav className="menu-wrap chat-session-menu-wrap" itemScope itemType="https://schema.org/Navigation">
            <ul className="menu menu-list list-unstyled chat-session-menu entry-card-list" role="menu" itemScope itemType="https://schema.org/ItemList">
              {/* 아이템 생성 */}
              { chatSessions.map( (cs, csi) => {
                  return (
                    <li key={csi} className="menu-item d-flex align-items-center" itemScope itemType="https://schema.org/ListItem" data-count={csi + 1}>

                      <ChatSessionEntry data={cs} dateformat="yyyy-MM-dd HH:mm:ss" />

                      <ChatSessionEntry data={cs} dateformat="yyyy-MM-dd HH:mm:ss" />

                    </li>);
                } )
              } 
            </ul>

            { lastPaged && <BlockNotFound contents="더 이상 채팅 세션이 없습니다." /> }

            
          </nav>
        </div> {/* form-wrap */}

      </div>
    </section>

  </>);
};