import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setActive  } from "../store/chatPromptSlice";
import { getSessionStorage } from "../../public/assets/js/commons";

/**
 * 페이지 변경 - <body> 업데이트
 */
const BodyClass = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const ui = useSelector( ( state: any ) => state.ui );
  const dispatch = useDispatch();

  useEffect( () => {

    const classes = [ 'page', 'page-template' ];

    if ( ui.expanded ) classes.push( 'expanded-menu-drawable' );

    try {
      
      let paths: string[] = location.pathname.split("/").filter( ( val: string ) => val.trim() != "" );
      let name: string | undefined;

      if ( paths.length < 2 ) {
        // 
        name = paths.length == 0 ? "home" : paths.pop();
      }

      if ( name ) {
        classes.push( name ); 
        

        // 채팅 프롬프트 활성화 - 대화 시작 / 종료 토글
        if ( name == "c" ) dispatch( setActive(true) );
        else dispatch( setActive(false) );

        if ( ! window.isLoggedIn() ) {
          if ( ['home', 'signin', 'singup'].includes( name ) == false ) navigate("/signin"); // - 로그인 페이지
        }
        else if ( name == "signin" && window.isLoggedIn() ) navigate("/"); // - MyPage  
      }
      
    }
    catch ( e: any ) {
      console.log(e.message); 
    }
    finally {
      document.body.classList = "";
    }
 
    for( const c of classes ) {
      if ( c.trim() == "" || document.body.classList.contains( c ) ) continue;
      else document.body.classList.add( c );
    }


  }, [location] )

  return null;
};

export default BodyClass;