/**
 * 컴포넌트 : 서랍 메뉴
 */

import * as Commons from "../../../public/assets/js/commons";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as FetchChatSession from "../../utils/fetchs/fetchChatSession";
import { setUpdateMenuChatSessions } from "../../store/uiSlice";

import { IDataChatSession } from "../../utils/interfaces";
import sortBy from "sort-by";
import BlockNotFound from "../headline/BlockNotFound";

/* 인터페이스: 채팅 세션 그룹
*/ 
interface IChatSessionGroup {
  today : {
    "text": string,
    "datas": IDataChatSession[]
  },
  yesterday: {
    "text": string,
    "datas": IDataChatSession[]
  },
  "7days" : {
    "text": string,
    "datas": IDataChatSession[]
  },
  other : {
    "text": string,
    "datas": IDataChatSession[]
  }
}

export default function DrawableMenu() {

  const location = useLocation();
  const urlQuerys = new URLSearchParams(location.search);

  const cursid : number = urlQuerys.size && urlQuerys.has('sid') != null && urlQuerys.get('sid')?.trim() != "" ? parseInt( urlQuerys.get('sid')?.toString() ?? "0" ) : 0; // 현재 채팅 새션 ID
  

  const dispatch = useDispatch();
  const ui = useSelector( (state:any) => state.ui );

  const [ chatSessions, setChatSessions ] = useState<IChatSessionGroup|null>(null);

  useEffect( () => {

    const curDateTime = Commons.formatDateTime('yyyy-MM-dd HH:mm:ss');
    const updatedChatSessions = ui.update_menu_chat_sessions;

    if ( window.isLoggedIn() ) { // 로그인 된 경우 메뉴
      /* 채팅 세션 메뉴 초기화
      */ 
      
      if ( ! updatedChatSessions ) {
        dispatch( setUpdateMenuChatSessions( curDateTime ) );
       
      }
      else {

        FetchChatSession.findSessions( "me", 1, 10, datas => {

          if ( ! datas || ( datas && ! datas.length )  ) {
            // 검색 결과 : 채팅 세션 없음
            setChatSessions( null );
          }
          else {
            // 검색 결과 : 채팅 세션 있음
            const nowDate = new Date( curDateTime );
            const groupBy = {
              'today': { 'text' : '오늘', 'datas' : [] },
              'yesterday': { 'text' : '어제', 'datas' : [] },
              '7days': { 'text' : '지난 7일', 'datas' : [] },
              'other': { 'text' : '그외', 'datas' : [] }
            } as IChatSessionGroup

            datas.sort( sortBy('updated_at') ).reverse(); // 정렬

            // 시간 포맷( ISO8601 ) -> yyyy-MM-dd HH:mm:ss 형태로 변경
            datas.map( data => { 
              return { 
                ...data, 
                ...{ updated_at: data['updated_at'] ? Commons.formatDateTimeByISO8601( data['updated_at'], 'yyyy-MM-dd HH:mm:ss') : null, created_at: data['created_at'] ? Commons.formatDateTimeByISO8601( data['created_at'], 'yyyy-MM-dd HH:mm:ss') : null } 
              } 
            } )
            .forEach( data => {
              if ( ! data.updated_at ) return;

              const date = new Date( data.updated_at ); 

              if ( nowDate.toDateString() === date.toDateString() ) groupBy['today'].datas.push( data );
              else if ( date.toDateString() == new Date(nowDate.getTime() - 86400000).toDateString() ) groupBy['yesterday'].datas.push( data );
              else if ( date > new Date(nowDate.getTime() - 604800000) && date <= nowDate ) groupBy['7days'].datas.push( data );
              else groupBy['other'].datas.push( data );

            } );

            setChatSessions( groupBy ); // - 채팅 세션 데이터 업데이트
          }

        } );
      }
    } // end if

  }, [ ui.update_menu_chat_sessions ]);

  return (<>
    <div className="app-drawable-menu-wrap">
      <aside className="app-drawable-menu" id="drawable-menu" aria-expanded={ui.expanded ? 'true' : 'false'}>
        <div className={`container${ ui.expanded ? "" : " px-0"}`}> 

          <div className=""></div>
          
          {/* 메뉴: 지난 대화 세션 */}
          <div className="menu-containr w-100"> 

            <hgroup className="menu-containr-headline"> 
              <h2 className="mb-0" itemProp="headline" aria-label="지난 대화">
                <i className="fa-solid fa-clock-rotate-left"></i>
                <span>지난 대화</span>
              </h2>
            </hgroup>
            
            <nav className="menu-wrap chat-session-menu-wrap" itemScope itemType="https://schema.org/Navigation" role="navigation">

              { ! chatSessions && ( <BlockNotFound contents="지난 대화가 없습니다." /> ) }

              { chatSessions && Object.entries(chatSessions).map(([key, group]) => ( group.datas.length > 0 && (<React.Fragment key={key}>
                  
                  <h3 itemProp="headline">{group.text}</h3>

                  <ul className="menu menu-list list-unstyled chat-session-menu" itemScope itemType="https://schema.org/Menu">
                    { group.datas.map( ( s: IDataChatSession, si: number  ) => {
                      return (
                      <li className="menu-item menu-item-type-icon" key={si}>
                        <Link to={`/c?sid=${s['id']}`} className={`link link-has-icon link-unstyle${ s['status'] == 0 ? ' publish' : '' }${ s['id'] == cursid ? ' activated' : '' }`} title="" aria-label="">
                          <i className="im icon-bubble"></i><span> {  s['lastQuestion'] ? s['lastQuestion'] : "빈 대화 세션입니다." } </span>
                        </Link>
                      </li> 
                      );
                    }) }
                  </ul>
                </React.Fragment>
                )
              ))}
            </nav>

          </div> {/* 메뉴: 지난 대화 세션 */}

          <nav className="app-menu app-menu-global" id="global-menu"></nav>

        </div>
      </aside>
    </div>
  </>);
}