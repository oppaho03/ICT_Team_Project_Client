/**
 * import * 
 * - library classes
 */
import { Suspense, useEffect } from 'react'

import "./styles/styles.css"
import "./ts/app"

import * as Commons from '../public/assets/js/commons'

import { RouterProvider } from 'react-router-dom' 

import Loader from './componenets/common/Loader' // (공통) 컴포넌트 : 대기, 로더 
import routes from './utils/routes' // ROUTER 설정

import { useSelector } from 'react-redux';
import * as uiSlice from './store/uiSlice'
import { useDispatch } from 'react-redux'

import * as FetchMap from './utils/fetchs/fetchMaps';
import { IDataMember } from './utils/interfaces'



declare var bootstrap : any | null; // - 부트스트랩 개체

function App() {
  
  // const [count, setCount] = useState(0)
  const UI = useSelector( (state: any) => state.ui );
  const dispatch = useDispatch();


  /* window 바인딩 
  */
  if ( true ) {

    /// window.message 바인드
    Commons.setEventListener( window, "message", ( e: MessageEvent ) => {
      // (event.origin !== 'http://localhost:3000') return; // 안전을 위해 이벤트의 origin 확인
      // console.log(e.data);
    }, {} );

  }

  /* 전역 함수 초기화 (global.d.ts / vite-env.d)
  */ 
  if ( true ) {

    window.onLoading = () => { if ( ! UI.loading ) dispatch( uiSlice.setLoading(true) ); }
    window.offLoading = () => { if ( UI.loading ) dispatch( uiSlice.setLoading(false) ); }

    window.isScrollYEnded = ( el: HTMLDivElement ) => {
      return (el.scrollHeight && el.clientHeight) && (el.scrollHeight - el.clientHeight - el.scrollTop <= 0) ? true : false;
    }
  
    /**
     * 모달 : 바인드 - 열림
     * @param {HTMLElement} modal 
     * @param {function} callback 
     */
    window.modalBindOpened = (modal, callback) => { Commons.setEventListener( modal, 'show.bs.modal', callback, {} ); }

    /**
     * 모달 : 바인드 - 닫힘
     * @param {HTMLElement} modal 
     * @param {function} callback 
     */
    window.modalBindClosed = (modal, callback) => { Commons.setEventListener( modal, 'hidden.bs.modal', callback, {} ); }

    /**
     * 모달 : 일반 메시지
     * @param {string} message 
     * @param {string} title
     * @returns
     */
    window.modalAlter = ( message: string, title: string | null = null ) => { 

      let el = document.getElementById("modal-alter");

      if ( el ) { // - 모달 새로 생성(복제)
        let elTemp = el.cloneNode( true );
        el.replaceWith( elTemp );
        el = document.getElementById("modal-alter");
      }

      // let newEl = el?.cloneNode( true );

      // if ( el ) el.replaceWith(el.cloneNode( true ));
      
      const modal = el ? new bootstrap.Modal( el ) : null
      if ( UI.modal || ! modal ) return null; 
      else el = modal._element as HTMLElement; 

      /* 모달 : 타이틀
      */ 
      if ( title ) {
        const hl = el?.querySelector("#modal-alter-label");
        if ( hl ) hl.innerHTML = title;
      }
      
      /* 모달 : 내용 
      */
      const modalBody = el?.querySelector(".modal-body"); 
      if ( modalBody && message ) {
        
        const p = modalBody.querySelector("p");
        if ( p ) p.innerHTML = message;

      }

      modal.show(); 
      // modal.hide();
      return el;
    };



    /**
     * 모달 - 로그인 
     */
    window.modalOfSignin = () => {
      const modal = window.modalAlter( "로그인이 필요한 서비스 입니다." );
      if ( ! modal ) return;
      else window.modalBindClosed( modal, () => { document.location.replace("/signin"); } );
    }



    /**
     * 로그인 유무 확인
     */
    window.isLoggedIn = () => {
      const token = Commons.getSessionStorage( "token" );
      return token ? true : false;
    }

  } // - 전역 함수 초기화 (global.d.ts / vite-env.d)
  
  useEffect(() => { 

    // 카카오 맵 스크립트 로드
    FetchMap.addScript( () => { 
      dispatch( uiSlice.setMap(true) ); 

    } );

  }, []);


  return (
    <>
      <Suspense fallback={<Loader />}> 
        
        <RouterProvider router={routes} />
      </Suspense>
    </>
  )
}

export default App;
