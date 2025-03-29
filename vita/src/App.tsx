/**
 * import * 
 * - library classes
 */
import { Suspense, useEffect } from 'react'

import "./styles/styles.css"
import "./ts/app"

import { RouterProvider } from 'react-router-dom' 

import Loader from './componenets/common/Loader' // (공통) 컴포넌트 : 대기, 로더 
import routes from './utils/routes' // ROUTER 설정

import { useSelector } from 'react-redux';
import { setMap } from './store/uiSlice'
import { useDispatch } from 'react-redux'
import * as Commons from '../public/assets/js/commons'

declare var bootstrap : any | null; // - 부트스트랩 개체

function App() {
  
  // const [count, setCount] = useState(0)
  const ui = useSelector( (state: any) => state.ui );
  const dispatch = useDispatch();

  /* 전역 함수 초기화 (global.d.ts / vite-env.d)
  */ 
  if ( true ) {
  
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
      
      const modal = el ? new bootstrap.Modal( el ) : null
      if ( ui.modal || ! modal ) return null; 
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
     * 로그인 유무 확인
     */
    window.isLoggedIn = () => {
      const token = Commons.getSessionStorage( "token" );
      return token ? true : false;
    }

    /**
     * 구글 맵 생성
     */
    window.initGoogleMap = () => {
      if ( ! ui.map ) dispatch( setMap(true) ); // UI. 맵 활성화
    }
  } // - 전역 함수 초기화 (global.d.ts / vite-env.d)

  useEffect(() => { 
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
