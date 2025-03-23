import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setActive  } from "../store/chatPromptSlice";

/**
 * 페이지 변경 - <body> 업데이트
 */
const BodyClass = () => {

  const location = useLocation();

  const dispatch = useDispatch();

  useEffect( () => {

    const classes = [ 'page', 'page-template' ];

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