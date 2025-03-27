/**
 * 
 */
// import React from "react";

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setMessage, setPending } from "../store/chatPromptSlice";

import ChatMessage from "../componenets/chat/ChatMessage";

import sortBy from "sort-by";

import * as FecthChatSession  from "../utils/fetchs/fetchChatSession";

// import * as Common from "../../public/assets/js/commons";

declare var gsap: any | null; // GSAP 코어 객체

const __PREFIX__ = "chat-message"; // - 접두사 (Prefix)

// 인터페이스 : 메타 - 용어 및 카테고리
interface IMetaDataCategory { id: number, name: string } 

/**
 * 메타 : 용어 및 카테고리 생성
 * @param { IMetaDataCategory | Array<IMetaDataCategory> } original
 */
function createMetaDataCategory( original: IMetaDataCategory | Array<IMetaDataCategory> ): HTMLElement | DocumentFragment | null {

  if ( ! original.length ) {
    const item = document.createElement( "span" );
    item.className = "chat-term-item";
    item.dataset['id'] = (original as IMetaDataCategory).id.toString();
    item.innerHTML = (original as IMetaDataCategory).name;

    return item;
  }
  else {
    const df = document.createDocumentFragment();
    for( const data of original as Array<IMetaDataCategory> ) {
      const item = createMetaDataCategory( data );
      if ( item ) df.appendChild( item );
    }
    return df;
  }

};

/**
 * <p> 테그 생성 : 메시지 
 * @param {string | null} message
 * @return { HTMLParagraphElement | null }
 */
function createMessage ( message: string | null ): HTMLParagraphElement | null {
  if ( ! message || ( message && message.trim() == "") ) return null;
  
  const el = document.createElement("p");
  el.ariaLabel = "message";
  el.innerHTML = message;

  return el;
}

export default function ChatSession (  ) {

  /* URL 쿼리 조건 
   * - sid : 대화 세션 ID
  */
  const location = useLocation();
  const urlQuerys = new URLSearchParams(location.search);

  const sid : number = urlQuerys.size && urlQuerys.has('sid') != null && urlQuerys.get('sid')?.trim() != "" ? parseInt( urlQuerys.get('sid')?.toString() ?? "0" ) : 0;
  

  const dispatch = useDispatch();
  // const ui = useSelector( (state: any) => state.ui );
  const prompt = useSelector( (state: any) => state.prompt );

  // const dispatch = useDispatch();
  
  const contentRef = useRef<HTMLDivElement> ( null );
  const endPointRef = useRef<HTMLDivElement> ( null );
  
  const messageTempUserRef = useRef<HTMLTemplateElement> ( null );
  const messageTempBotRef = useRef<HTMLTemplateElement> ( null );

  /**
   * 채팅 : 메타 업데이트 (TOP)
   * @param {HTMLElement} msgElem 
   * @param {string} type 
   * @param {any} values 
   * @returns
   */
  const updateMetaTop = ( msgElem: HTMLElement, type: string, values: any ): void => {

    const wrap = msgElem.querySelector('.meta-top');
    if ( ! wrap ) return; 

    let target: HTMLElement | null = null; // - 메타 영역
    let items : HTMLElement | DocumentFragment | null = null; // - 메타 아이템
    

    if ( values ) {
      
      if ( type == "category" ) {
        target = wrap.querySelector( ".chat-term.term-type-" + type );
        items = createMetaDataCategory( values );
      }
      
    }

    if ( ! target ) return;

    if ( items ) {
      target.appendChild( items );
    }

  }

 /**
  * 채팅 : 메시지 업데이트 
  * @param msgElem 
  * @returns 
  */
  const updateChatMessage = ( msgElem: HTMLElement ): void => {
    // console.log(cnt);
    const parent = contentRef?.current;
    const endPoint = endPointRef?.current;

    if ( ! parent ) return;
    if ( endPoint ) parent.insertBefore(msgElem, endPoint);
    else parent.appendChild(msgElem);
  }

  // 채팅 : 메시지 업데이트 - 사용자
  const updateUserChatMessage = ( message: string ): void => {

    // 컨텍츠 컨테이너 
    const cmTempl = messageTempUserRef?.current; 
    const cm = cmTempl && cmTempl.firstElementChild ? cmTempl.firstElementChild.cloneNode(true) as HTMLElement : null;
    if ( ! cm ) return;
    else dispatch(setPending( true ));

    /* 채팅 메시지 : 헤더
    */ 
    const head = cm.querySelector( `.${__PREFIX__}-row-head` );
    if ( head ) {
      /// 헤더 > 메시지 출력
      const el = createMessage(message);
      const msgBox = head.querySelector( `.${__PREFIX__}__content-mbox`) ;
      if ( el && msgBox ) msgBox.appendChild( el );
    }

    /* 채팅 메시지 전처리 및 답변 전달
    */ 
    if ( message ) {

      // 전처리 : 문장 -> 키워드 추출  
      FecthChatSession.extrKeywords( message, ( keywords => {


        console.log( keywords );

        if ( ! keywords || ! keywords.length ) {
          // 추출 결과 : 키워드 없음

        }
        else {
          // 추출 결과: 키워드 있음
          // FecthChatSession.findAnswer( message, resp, data => { console.log(data); } );
        }

        // if ( ! resp || ! resp.length ) {
        //   // 추출한 키워드 값이 없음 
        //   console.log("error");
        // }
        // else {
        //   // 추출한 키워드 답변 검색
        //   FecthChatSession.findAnswer( message, resp, data => { console.log(data); } );
        // }
        
      } ) );

    } // 채팅 메시지 전처리 및 답변 전달

    /* 채팅 메시지 : 메타 (TOP)
    */ 
    if ( true ) {
      const values = [];
      const filters = prompt.filters; // 필터
      if ( filters && Object.keys(prompt.filters).length ) {

        for( const key of [ "department", "disease" ] ) {
          if ( ! filters[key] ) continue;
          else values.push( filters[key] ); // - 값 추가
        }

        if ( values.length ) values.sort( sortBy("name") ).reverse(); // 이름순으로 정렬(내림차순)
      }

      values.push( { id: 0, name: "질문" } );

      updateMetaTop( cm, "category", values ); // - 메타 업데이트
    }
    
    /* 채팅 메시지 : 메타 (BOTTOM)
    */ 
    const metaBtm = cm.querySelector('.meta-bottom');
    if ( metaBtm ) {}
 

    updateChatMessage( cm ); // <ChatMessage /> 채팅 메시지 아이템 추가
    dispatch(setPending( false ));
    
  };  
 


  useEffect( () => {

    // if ( sid ) {
    //   // sid -> 이전 채팅 세션 재구성 (이어하기)
    //   console.log( sid );
    // }
    
    const latestMessage = prompt.latestMessage; // 최신 메시지
    
    if ( sid == 0 ) {
      // 새로운 채팅 세션
    }

    if ( latestMessage ) updateUserChatMessage( latestMessage ); // 채팅 메시지 업데이트


    return () => {
      // 이 부분은 컴포넌트가 언마운트되거나, 의존성이 변경될 때 실행됨
      setMessage(null);
    };

  }, [prompt.latestMessage] );
 
  return ( <>
    <section className="section d-felx flex-column" id="chat-content-session">
      <div className="container flex-grow-1 flex-shrink-1">

        {/* 템플릿 구간 */}
        <template ref={messageTempBotRef} className="chat-message-template"> <ChatMessage type="bot" /> </template>
        <template ref={messageTempUserRef} className="chat-message-template"> <ChatMessage type="user" /> </template>

        <div ref={contentRef} id="chat-content" data-session-id={0} data-pending={ prompt.pending ? '1' : '0' }>

          { ! sid  && 
            <ChatMessage type="bot" message="무엇을 도와드릴까요?" />
          }

          <ChatMessage type="bot" />
          <ChatMessage type="bot" ref={endPointRef} />
        
        </div>  {/* chat-content */}

      </div>
    </section>
  </> );
};