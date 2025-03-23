/**
 * 
 */
// import React from "react";

import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ChatMessage from "../componenets/chat/ChatMessage";
import { useSelector } from "react-redux";
import { fetchAsyncChatAnswersSearch, fetchAsyncExtKeywords } from "../utils/fetchs";
import { IDataAnswer, IDataCategory } from "../interfaces";
import { useDispatch } from "react-redux";
import { setPending } from "../store/chatPromptSlice";
import { getSVGElement } from "../componenets/common/Loader";

import * as Common from "../../public/assets/js/commons";

declare var gsap: any | null; // GSAP 코어 객체

const DataTermSystem : IDataCategory = {
  id: 0,
  name: '시스템',
  slug: 'system',
  group_number: 0,
  description: '',
  count: 0,
  parent: 0
}

/* 대화 추가하기
*/ 
const addChatMessage = ( templ: HTMLTemplateElement, type: string, datas: any | null ): HTMLElement | null => {
  type = type.toLocaleLowerCase(); // 소문자 변환
  const cnt = templ.querySelector(`[data-type="${type}"]`);
  if ( ! cnt ) return null;
  else return updateChatMessage( cnt.cloneNode(true) as HTMLElement , type, datas);
}

const updateChatMessage = ( ccnt: HTMLElement, type: string, datas: any ): HTMLElement | null => {
  type = type.toLocaleLowerCase(); // 소문자 변환
  const __PCLASS__ = 'chat-message';

  /* 채팅 메시지 - 메시지 삽입
  */
  const head = ccnt.querySelector(`.${__PCLASS__}-row-head`);
  const headThumb = head?.querySelector(`.${__PCLASS__}__thumb`);
  const headContent = head?.querySelector(`.${__PCLASS__}__content`);

  const body = ccnt.querySelector(`.${__PCLASS__}-row-body`);
  const bodyContent = body?.querySelector(`.${__PCLASS__}__content`);

  if ( [ 'sys', 'user' ].includes( type ) !== false && headContent ) {

    const msgBox = headContent.querySelector(`.${__PCLASS__}__content-mbox`);
    if ( msgBox ) {
      msgBox.innerHTML = ""; 
      
      msgBox.append( setMessage( Common.toSpannedLine(datas.message) ) );


      // GSAP 
      if ( typeof gsap != 'undefined' && type == "sys" ) {
        // 애니메이션 
        const chars = msgBox.querySelectorAll("p[aria-label=\"message\"] > span");
        gsap.set( chars, { autoAlpha: 0, y: 10 } );
        gsap.to( chars, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.015, } )
      }
    }
    
    // 사용자 - 썸네일
    if ( type == "user" ) {
      /* thumb_url : 썸네일 이미지 URL */
      datas.thumb_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnOZY7Pr9nMm5Ev1ykgFkD6A1u6p7aiZfpuZ5dUU5j3bENgLbtqIjNAiY2JG9GiBWvVGY&usqp=CAU"; // ***
      
      const wrap = headThumb?.querySelector("a");
      if ( wrap ) {
        wrap.innerHTML = ""; // 내부 비우기 

        const fr = document.createDocumentFragment();

        if ( datas.thumb_url ) {
          // 프로필 사진으로 변경
          const thumb = document.createElement("img");
          thumb.src = datas.thumb_url;
          thumb.className = `${__PCLASS__}__thumb-img d-block`;
          fr.append( thumb ); // append Fragment
        }
        else {
          // 기본 아이콘으로 변경
          const thumb = document.createElement("i");
          thumb.className = `im icon-user ${__PCLASS__}__thumb-img`;
          fr.append( thumb ); // append Fragment
        } 

        wrap.append( fr );

      }

    } // if ( type == "user" )
    
  }
  else if ( type == "bot" && headContent && bodyContent ) {

    const headContentMsgBox = headContent.querySelector(`.${__PCLASS__}__content-mbox`);
    const bodyContentMsgBox = bodyContent.querySelector(`.${__PCLASS__}__content-mbox`);

    if ( headContentMsgBox ) headContentMsgBox.innerHTML = "";
    if ( bodyContentMsgBox ) bodyContentMsgBox.innerHTML = "";

    if ( datas as IDataAnswer ) {
      // datas : 
      
      // answer - intro
      let messages = datas.intro ?? null;
      if ( messages ) headContentMsgBox?.append( setMessage(  Common.toSpannedLine(messages) ) );

      
      // answer - body
      messages = datas.body ?? null;
      if ( messages ) bodyContentMsgBox?.append( setMessage( Common.toSpannedLine(messages) ) );

      // answer - conclusion
      messages = datas.conclusion ?? null;
      // if ( messages ) bodyContentMsgBox?.append( setMessage( Common.toSpannedLine(messages) ) );


      // GSAP 
      let chars = [] as any;
      if ( headContentMsgBox && bodyContentMsgBox ) chars = Array.from(headContentMsgBox.querySelectorAll("p[aria-label=\"message\"] > span")).concat( Array.from(bodyContentMsgBox.querySelectorAll("p[aria-label=\"message\"] > span")) );
      if ( chars.length  ) {
        gsap.set( chars, { autoAlpha: 0, y: 10 } );
        gsap.to( chars, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.005, } )
      }

    }
    else headContentMsgBox?.append( setMessagePending( ) );  // 대기 아이콘
    
  }

  /* 채팅 메시지 - 메타 (TOP)
  */
  let wrapMeta = ccnt.querySelector(`.${__PCLASS__}-row-meta.meta-top`);
  if ( wrapMeta && typeof datas == "object" && datas != null ) {

    // 메타 - 카테고리 
    if ( datas.categories ) {
      const wrap = document.createElement( 'div' );
      wrap.className = 'chat-term term-type-category';
      wrap.append( setMessageCategories( datas.categories ) );
      
      wrapMeta.append( wrap );
    }
  }
  wrapMeta = ccnt.querySelector(`.${__PCLASS__}-row-meta.meta-bottom`);
  
  if ( wrapMeta && typeof datas == "object" && datas != null ) {
    
    // 메타 - 키워드 
    if ( datas.keywords ) {

      const wrap = document.createElement( 'div' );
      wrap.className = 'chat-term term-type-keywords';
      wrap.append( setMessageCategories( datas.keywords ) );
      
      wrapMeta.append( wrap );
    }
  }

  return ccnt;

}

// 채팅 메시지 : 입력
const setMessage = ( messages: string | string[] | null ): DocumentFragment => {  
  const wrap = document.createDocumentFragment(); // wrapper
  if ( messages != null ) {

    for ( const m of ( messages instanceof Array ? messages : [ messages ] ) ) {
      const el = document.createElement("p");
      el.className = "";
      el.setAttribute("aria-label", "message");
      el.innerHTML = m;
      wrap.appendChild( el );
    }

  }
  return wrap;
}

// 채팅 메시지 : 입력 (대기)
const setMessagePending = (): DocumentFragment => {  
  const wrap = document.createDocumentFragment(); // wrapper
  const el = document.createElement("div");
  el.setAttribute("aria-label", "message");
  el.innerHTML = getSVGElement();
  wrap.appendChild( el );
  return wrap;
}

// 채팅 메시지 : 카테고리 
const setMessageCategories = ( cats: IDataCategory[] | null ): DocumentFragment => {

  const fr = document.createDocumentFragment();
  if ( ! cats ) return fr;

  for( const cat of cats ) {
    
    // item : IDataCategory
    const item = document.createElement('span') as HTMLSpanElement;
    item.className = "chat-term-item";
    item.dataset['id'] = cat['id'] == null ? '0' : cat['id'].toString();
    item.innerHTML = cat['name']?? '';

    // const itemwrap = document.createElement('div') as HTMLDivElement;
    // itemwrap.className = "chat-term term-type-category";
    // itemwrap.append( item );

    fr.append( item );
  }
  
  return fr; 
}


export default function ChatSession (  ) {

  /* URL 쿼리 조건 
   * - sid : 대화 세션 ID
  */

  const location = useLocation();
  const urlQuerys = new URLSearchParams(location.search);

  const sid : number = urlQuerys.size && urlQuerys.has('sid') != null && urlQuerys.get('sid')?.trim() != "" ? parseInt( urlQuerys.get('sid')?.toString() ?? "0" ) : 0;
  
  const ui = useSelector( (state: any) => state.ui );
  const prompt = useSelector( (state: any) => state.prompt );

  const dispatch = useDispatch();
  
  const chatContentRel = useRef<HTMLDivElement> ( null );
  const chatMessageTemplatesRel = useRef<HTMLTemplateElement> ( null );


  useEffect( () => {

    /* 채팅 컨텐츠 (메인)
    */
    const chatContent = chatContentRel?.current;
    const chatMessageTemplates = chatMessageTemplatesRel?.current;

    if ( !chatContent || ! chatMessageTemplates ) return;

    if ( ! chatContent.classList.contains("done") ) {
      if ( sid ) {
        // sid -> 이전 채팅 세션 재구성 (이어하기)
        console.log( sid ); // sid : 대화 세션 ID
      }
      else {
        // 새로운 채팅 세션 시작
        
        // 채팅 메시지 추가 - 시스템
        const chatMessageItem = addChatMessage( chatMessageTemplates, "sys", { message: "무엇을 도와드릴까요?" } ); 
        if ( chatMessageItem != null ) chatContent.append( chatMessageItem );
      }

      chatContent.classList.add("done");
    }

    /* 채팅 컨텐츠 (메인) > 메시지 업데이트
    */
    if ( prompt.latestMessage != null ) {

      // 채팅 메시지 추가 - 사용자
      const msg = prompt.latestMessage;
      const chatQuestionMessage = addChatMessage( chatMessageTemplates, "user", { thumb_url: ui.profile_photo, message: msg } ); 

      if ( chatQuestionMessage != null ) chatContent.append( chatQuestionMessage );

      // 채팅 메시지 추가 - 봇 (대기)

      // 채팅 메시지 - 배열로 전환 처리
      const chatAnswerMessage = addChatMessage( chatMessageTemplates, "bot", null );
      if ( chatAnswerMessage != null ) {

        chatContent.append( chatAnswerMessage ); // 채팅 메시지 추가 - 봇 (대기) 
        dispatch(setPending(true)); // - 채팅 상태 변화 - 대기 

        /* *** 임시 대기
        */ 
        setTimeout( () => { 


        fetchAsyncExtKeywords( msg, null );
        
        // 불명열은 무슨 병일까요?
        const __keywords = [ "불명열", "병" ];
       
        // 채팅 메시지 추가 - 봇 (질문 시작)
        fetchAsyncChatAnswersSearch( __keywords, (datas: IDataAnswer[] | null ) => {

          const catsList = Array<IDataCategory>();

          if ( datas == null || ! datas.length ) {

            catsList.push( {...DataTermSystem} );
            
            // 대답 찾지 못함
            updateChatMessage( chatAnswerMessage, "sys", { 
              categories: catsList,
              message: "일치하는 답변이 없습니다.",
            } ); // 채팅 메시지 - 업데이트
          }
          else {
            // 대답 찾음
            // - 답변이 2개 이상일 경우 선택 메뉴 
            // - [0] 기본 선택
            const response = { ...datas[0], keywords: __keywords.map( (keyword) => { return { id: 0, name: keyword, slug: keyword } } ) };

            updateChatMessage( chatAnswerMessage, "bot", response ); // 채팅 메시지 - 업데이트
          }

          dispatch(setPending(false)); // - 채팅 상태 변화 - 완료 

        } );

        } , 2000 ); // *** 임시 대기

        
      } /// 채팅 메시지 - 배열로 전환 처리
    }
    
  }, [prompt.latestMessage] )
 
  // console.log(message);

  return ( <>
    <section className="section d-felx flex-column" id="chat-content-session">
      <div className="container flex-grow-1 flex-shrink-1">

        <div ref={chatContentRel} id="chat-content" >

          <template ref={chatMessageTemplatesRel} id="chat-message-templates"> 
            {/* 컴포넌트 : 채팅 메시지 */}
            <ChatMessage type="sys" message={null} />
            <ChatMessage type="user" message={null} />
            <ChatMessage type="bot" message={null} />
          </template>

        </div>  {/* chat-content */}

      </div>
    </section>
  </> );
};