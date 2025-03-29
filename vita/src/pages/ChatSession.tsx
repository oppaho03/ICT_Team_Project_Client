/**
 * 
 */
// import React from "react";

import shortid from 'shortid';

import * as Commons from '../../public/assets/js/commons';

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setMessage, setPending } from "../store/chatPromptSlice";

import ChatMessage from "../componenets/chat/ChatMessage";

import sortBy from "sort-by";

import * as FecthChatSession  from "../utils/fetchs/fetchChatSession";
import * as FetchMap from '../utils/fetchs/fetchGoogleMaps';
import * as FetchYoutubeData from '../utils/fetchs/fetchYoutubeData';
import { IDataChatAnswer, IDataChatAnswerBindSession, IDataYoutubeSearchResult } from "../utils/interfaces";


import { setUpdateMenuChatSessions } from '../store/uiSlice';


declare var gsap: any | null; // GSAP 코어 객체
declare var google: any | null; // 구글 맵


const __PREFIX__ = "chat-message"; // - 접두사 (Prefix)

// 인터페이스 : 메타 - 용어 및 카테고리
interface IMetaDataCategory { id: number, name: string } 

// 데이터셋 : 봇(시스템) 
const MetaDataBotChatMessage = {
  id: 0,
  file_name: "bot-" + shortid.generate(),
  intro : null,
  body : null,
  conclusion: null,
  categories: [],
  keywords: []
} as IDataChatAnswer;

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
 * 메타: 비디오 생성
 * @param {Array<IDataYoutubeSearchResult> } datas 
 * @returns 
 */
function createMetaVideo ( datas: Array<IDataYoutubeSearchResult> ): Array<HTMLElement> {
  
  const result: HTMLElement[] = [];

  for( const data of datas ) {

    if ( ! data ) continue;

    // 데이터 파싱 : IDataYoutubeSearchResult
    const videoId = data.id.videoId;
    const snippet = data.snippet;
    const title = snippet.title;
    const desc = snippet.description;
    const channelTitle = snippet.channelTitle;
    
    const thumbnails = snippet.thumbnails;
    const thumbnail = thumbnails ? thumbnails.medium : null;

    // a.a-wrap.entry-card-wrap
    const wrap = document.createElement( "a" );
    wrap.className = "a-wrap entry-card-wrap";
    wrap.target = "_blank";
    wrap.href = `https://www.youtube.com/watch?v=${videoId}`;

    wrap.innerHTML = `<article class="entry-card type-video format-standard">
      <figure class="entry-card-thumb" data-video-id="${videoId}">
        <img src="${ thumbnail ? thumbnail.url : "" }" class="entry-card-thumb-image card-thumb-image" alt="${title}" loading="lazy" decoding="async" /> 
      </figure>
      <div class="entry-card-content">
        <h2 class="entry-card-title" itemProp="headline">${title}</h2>
        <p class="entry-card-description card-description">${desc}</p>
        <p class="entry-card-info">${channelTitle}</p>
      </div>
    </article>`;

    result.push( wrap );
  } // data

  return result;
}

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
   * - cursid : 대화 세션 ID
  */
  const location = useLocation();
  const urlQuerys = new URLSearchParams(location.search);

  const navigate = useNavigate(); 


  const cursid : number = urlQuerys.size && urlQuerys.has('sid') != null && urlQuerys.get('sid')?.trim() != "" ? parseInt( urlQuerys.get('sid')?.toString() ?? "0" ) : 0;

  const [ sessionId, setSessionId ] = useState<number>( cursid );
  

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
   * 채팅 : 메타 업데이트 (Bottom)
   * @param {HTMLElement} msgElem 
   * @param {string} type 
   * @param {any} values 
   * @returns 
   */
  const updateMetaBottom = ( msgElem: HTMLElement, type: string, values: any ): void => {
   
    const wrap = msgElem.querySelector('.meta-bottom');
    if ( ! wrap ) return; 

    let target: HTMLElement | null = null; // - 메타 영역
    let items : HTMLElement | DocumentFragment | null = null; // - 메타 아이템
    
    if ( values ) {
      
      if ( type == "video" ) {
        
        target = wrap.querySelector( ".chat-info.info-type-video" );

        if ( ! target ) {
          target = document.createElement("div");
          target.className = "chat-info info-type-video";
          target.innerHTML = `<h3 class="chat-info__title" itemProp="headline"><i class="fa-brands fa-youtube"></i>유튜브 영상</h3>`;

          wrap.appendChild(target);
        }

        /// 비디오 리스트 생성 
        const elVideos = createMetaVideo( values );

        if ( elVideos.length ) {
          items = document.createElement("ul");
          items.className = "list-unstyled";

          for( const el of elVideos ) {

            const _item = document.createElement("li");
            _item.className = "chat-info-item";
            _item.appendChild( el );

            items.appendChild( _item );
          }
        } // endif
        
      }
    }
    // createMetaVideo( datas );

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

    Commons.scrollToBottom(document.getElementById("wrapper"));
  }

  // 채팅 : 메시지 업데이트 - 사용자
  const updateUserChatMessage = ( message: string, qnaId: number = 0, id: number = 0 ): void => {

    // 컨텍츠 컨테이너 
    const cmTempl = messageTempUserRef?.current; 
    const cm = cmTempl && cmTempl.firstElementChild ? cmTempl.firstElementChild.cloneNode(true) as HTMLElement : null;
    if ( ! cm ) return;
    else dispatch(setPending( true ));

    if ( qnaId ) cm.dataset['qnaId'] = qnaId.toString(); // - 질문 & 답변 ID
    if ( id ) cm.dataset['id'] = qnaId.toString(); // - 질문 ID 

    /* 채팅 메시지 : 헤더
    */ 
    const cmHead = cm.querySelector( `.${__PREFIX__}-row-head` );
    if ( cmHead ) {
      /// 헤더 > 메시지 출력
      const el = createMessage(message);
      const msgBox = cmHead.querySelector( `.${__PREFIX__}__content-mbox`) ;
      if ( el && msgBox ) msgBox.appendChild( el );
    }

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
  };

  // 채팅 : 메시지 업데이트 - 사용자 - 메시지 처리 (답변검색)
  const updateUserChatMessageProcess = ( message: string ): void => {

    // 전처리 : 문장 -> 키워드 추출  
    FecthChatSession.extrKeywords( message, ( datas => {

      const keywords = datas && datas.keywords ? datas.keywords : null;

      if ( ! keywords || ! keywords.length ) {
        // 추출 결과 : 키워드 없음
        updateBotChatMessage( [ { ...MetaDataBotChatMessage, ...{ intro: "유효한 키워드가 존재하지 않습니다. 질문을 바꿔서 다시 시도해주세요." } } ], -1 );
      }
      else {
        // 추출 결과: 키워드 있음
        /* 답변 검색
        */
       
        FecthChatSession.findAnswer( sessionId, message, keywords, ( data: IDataChatAnswerBindSession | string | null ) => { 

          const answerDef = { ...MetaDataBotChatMessage, ...{ intro: "적절한 답변을 찾을 수 없습니다." } };

          if ( 
            ! data
            || typeof data == "string" 
            // || ! (data as IDataChatAnswerBindSession ).answers  
            // || ! (data as IDataChatAnswerBindSession ).answers?.length 
          ) {
            // 검색 결과 : 답변 없음
            updateBotChatMessage( [ answerDef ], -1 );
          }
          else {
            // 검색 결과 : 답변 있음    
            console.log(data);
            const answes = ( data as IDataChatAnswerBindSession ).answers;
            if ( answes ) {
              updateBotChatMessage( answes == null ? [] : answes.map( answer => { return { ...answer, ...{ keywords } } } ) );
            } 
            else {
              // 검색 결과 : 답변 없음
              updateBotChatMessage( [ answerDef ], -1 );
            }


            // 채팅 세션 업데이트
            if ( cursid != data.sid ) {
              setSessionId( data.sid ); // - 채팅 세션 아이디 업데이트
              navigate( `/c?sid=${data.sid}`, { replace: true } ); // URL 쿼리 변경
              dispatch( setUpdateMenuChatSessions(Commons.formatDateTime('yyyy-MM-dd HH:mm:ss')) );
            }
            
          }
          
        } );
        
      }
    } ) );

    

  };
  
  // 채팅 : 메시지 업데이트 - 봇 
  const updateBotChatMessage = ( datas: Array<IDataChatAnswer>, qnaId: number = 0 ): void => {

    dispatch(setPending( false )); // 대기상태 해제

    // 컨텍츠 컨테이너 
    const cmTempl = messageTempBotRef?.current; 
    const cm = cmTempl && cmTempl.firstElementChild ? cmTempl.firstElementChild.cloneNode(true) as HTMLElement : null;
    if ( ! cm || ! datas || ! datas.length ) return;

    if ( qnaId > 0 ) cm.dataset['qnaId'] = qnaId.toString(); // - 질문

    const answerData = datas[0]; // [0] is main data
    if ( answerData ) {
      const id = answerData.id ? answerData.id : 0;
      if( id ) cm.dataset['id'] = id.toString();
    }
    
    /* 채팅 메시지 : 헤더
    */ 
    const cmHead = cm.querySelector( `.${__PREFIX__}-row-head` );
    if ( cmHead ) {
      const message = answerData.intro;

      /// 헤더 > 메시지 출력
      const el = createMessage(message);
      const msgBox = cmHead.querySelector( `.${__PREFIX__}__content-mbox`) ;
      if ( el && msgBox ) {
        // msgBox.innerHTML = ""; // 이전 메시지 지우기
        msgBox.appendChild( el );
      }
    }

    /* 채팅 메시지 : 본문
    */ 
    const cmBody = cm.querySelector( `.${__PREFIX__}-row-body` );
    if ( cmBody ) {

      const msgBox = cmBody.querySelector( `.${__PREFIX__}__content-mbox`) ;

      // 메시지 - 본문(body)
      // - .messages.body-messages
      if ( msgBox && answerData.body ) {
        const message = answerData.body;
        const el = createMessage(message);

        // message 영역 생성해서 삽입하기 
        if ( el ) {
          const _wrap = document.createElement( "div" );
          _wrap.classList.add( "messages", "body-messages" );

          _wrap.appendChild(el); // - 메시지 아이템 추가
          msgBox.appendChild( _wrap );
        }

      }
  
      // 메시지 - 결론(conclusion)
      // - .messages.conclusion-messages
      if ( msgBox && answerData.conclusion ) {
        const message = answerData.conclusion;
        const el = createMessage(message);

        // message 영역 생성해서 삽입하기 
        if ( el ) {
          const _wrap = document.createElement( "div" );
          _wrap.classList.add( "messages", "conclusion-messages" );

          const _hl = document.createElement( "h3" );
          _hl.setAttribute( "itemprop", "headline" );
          _hl.innerHTML = `<i className="fa-solid fa-comment"></i>다음으로 이런 것을 권장합니다.`;

          _wrap.appendChild( _hl )
          _wrap.appendChild(el); // - 메시지 아이템 추가
          msgBox.appendChild( _wrap );
        }
      }
    }
    

    /* 채팅 메시지 : 메타 (TOP)
    */ 
    if ( true ) {
      const values: Array<IMetaDataCategory> = [];
      const categories = answerData.categories;
      if ( categories && categories.length ) {

        for( const c of categories ) {
          values.push( { id: c.id, name: c.name } as IMetaDataCategory ); // - 값 추가
        }

        if ( values.length ) values.sort( sortBy("name") ); // 이름순으로 정렬(오름차순)

      }

      values.unshift( { id: 0, name: "시스템" } );
      updateMetaTop( cm, "category", values ); // - 메타 업데이트
    }

    /* 채팅 메시지 : 메타 (BOTTOM)
    */
   
    if ( qnaId === 0 ) {

      if ( prompt.latestMessage ) {
        FetchYoutubeData.findItems( {q: prompt.latestMessage}, ( datas ) => {

          if ( ! cm ) return;
          else updateMetaBottom( cm, "video", datas );
        } );
        
      }
    } 

    updateChatMessage( cm ); // <ChatMessage /> 채팅 메시지 아이템 추가
    Commons.scrollToBottom( document.getElementById("wrapper") );
  }

  /**
   * useEffect : 초기화 함수
   */
  useEffect( () => {
    FetchMap.addScript();
    // const script = FetchMap.addScript();
    // return () => {
    //   document.body.removeChild(script);
    // };
  }, [] );

  /**
   * useEffect : 채팅 세션 ID 초기화 함수
   */
  useEffect( () => {

    if ( cursid != sessionId ) {
      // 초기화
      const contents = contentRef?.current;
      if ( contents ) {
        for( const item of Array.from(contents.children).slice(0, -1) ) {
          item.remove();
        }
      }
      setSessionId( cursid ); // - 채팅 세션 아이디 업데이트
      
    }

    if ( cursid ) {
      // 초기화
      

      // cursid -> 이전 채팅 세션 재구성 (이어하기)
      FecthChatSession.findSessionQnA( cursid, ( datas ) => { 
        
        if ( ! datas || ( datas && ! datas.length )  ) {
          // 검색 결과 : 채팅 세션 없음
          // setChatSessions( null );
        }
        else {
          // 검색 결과 : QnA(질문 + 답변) 세션 추가

          datas.slice(-100).forEach( data => {

            const qnaId = data.id;
            const answer = data.answer;
            const question = data.question;

            updateUserChatMessage( question.content, qnaId, question.id );
            updateBotChatMessage( [answer], qnaId );

          } );

          
        }

      } );
    }
  }, [cursid] );

  useEffect( () => {

    if ( ! prompt.pending ) {

      const latestMessage = prompt.latestMessage; // 최신 메시지
    
      if ( latestMessage ) {
        updateUserChatMessage( latestMessage ); // 채팅 메시지 업데이트
        updateUserChatMessageProcess( latestMessage ); // 채팅 메시지 업데이트
      }
    }

    return () => {
      // 이 부분은 컴포넌트가 언마운트되거나, 의존성이 변경될 때 실행됨
      dispatch(setPending( false ));
      setMessage(null);
      
    };

  }, [prompt.latestMessage] );
 
  return ( <>
    <section className="section d-felx flex-column" id="chat-content-session">
      <div className="container flex-grow-1 flex-shrink-1">
      
        {/* 템플릿 구간 */}
        <template ref={messageTempBotRef} className="chat-message-template"> <ChatMessage type="bot" message="" /> </template>
        <template ref={messageTempUserRef} className="chat-message-template"> <ChatMessage type="user" /> </template>

        <div ref={contentRef} id="chat-content" className={`chat-content chat-content-${sessionId}`} data-session-id={sessionId} data-pending={ prompt.pending ? '1' : '0' }>

          { ! cursid  && 
            <ChatMessage type="bot" message="무엇을 도와드릴까요?" />
          }
          <ChatMessage type="bot" ref={endPointRef} />
        
        </div>  {/* chat-content */}

      </div>
    </section>
  </> );
};