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

    const paths = [ 'page', 'page-template' ];

    try {
      let name: string | undefined = location.pathname.split("/").filter( ( val: string ) => val.trim() != "" ).pop();
      if ( typeof name == 'undefined' || name == "" ) name = "home";
      
      if ( name == "" ) throw new Error('Can\'t parse path name.');
      else paths.push( name ); 

       // 채팅 프롬프트 활성화 - 대화 시작 / 종료 토글
      if ( name == "home" ) dispatch( setActive(false) );
      else  dispatch( setActive(true) );
      
    }
    catch ( e: any ) {
      console.log(e.message); 
    }
 
    for( const path of paths ) {
      if ( path.trim() == "" || document.body.classList.contains( path ) ) continue;
      else document.body.classList.add( path );
    }


  }, [location] )

  return null;
};

export default BodyClass;