/**
 * 컴포넌트 : 채팅 프롬프트 폼
 */
// import shortid from 'shortid';
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus, setActive, setMessage } from "../../store/chatPromptSlice"

import ChatPrompterFormFilter from "./ChatPrompterFormFilter";
import { useNavigate } from "react-router-dom";
import RecordToggleButton from "../button/RecordToggleButton";

import UploadImageButton from "../button/UploadImageButton";



export default function ChatPrompterForm ( ) {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const prompt = useSelector( (state: any) => state.prompt );

 
  useEffect(() => {
    if ( ! prompt.active ) inputPromptRef.current?.blur(); // 포커스 아웃 

  }, [ prompt.active ] );

  const inputPromptRef = useRef<HTMLInputElement>(null); // INPUT : 채팅 프롬프트 입력란

  ///
  const callbackSTT = ( message: string ) => {
    if ( inputPromptRef?.current ) 
      inputPromptRef.current.value = message;
  }

  /* 바인드: 포커스 인 (채팅 프롬프트 INPUT)
  */
  const inputFocus = ( e: React.FocusEvent<HTMLInputElement> ) => {
    // const t = e.target as HTMLInputElement;
    dispatch( setFocus( true ) ); // 채팅 프롬프트 포커스 상태 - true
  }

  /* 바인드 : 포커스 아웃 (채팅 프롬프트 INPUT)
  */
  const inputBlur = ( e: React.FocusEvent<HTMLInputElement> ) => {
    dispatch( setFocus( false ) ); // 채팅 프롬프트 포커스 상태 - false
  }

  /* 바인드: 키 다운 (채팅 프롬프트 INPUT)
  */
  const inputKeyDown = ( e: React.KeyboardEvent<HTMLInputElement> ) => { 
    const t = e.target as HTMLInputElement;
    const key = (e.key || e.code).toLowerCase();
    
    if ( key === "escape" ) {
      t.value = "";
      t.blur();
    }
  };

  /* 바인드: 키 다운 (채팅 프롬프트 폼)
  */ 
  const formSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault(); // 전송 

    /* 토큰 유효성 검사
    */
    if ( ! window.isLoggedIn() ) {
      const modal = window.modalAlter( "로그인이 필요한 서비스 입니다." );
      if ( modal ) {
        window.modalBindClosed( modal, () => { navigate("/signin"); });
        return;
      }
      else return navigate("/signin");
    }
      
    const input = inputPromptRef ? inputPromptRef.current : null;
    if ( ! input || input.value.trim() == "" ) return;

    if ( ! prompt.active ) {
      dispatch( setActive(true) ); // 채팅 프롬프트 활성화 - 대화 시작
      navigate("/c"); // /c 이동
    }

    let value = input.value;

    // 채팅 프롬프트 - 메시지 업데이트 
    if ( prompt.latestMessage != value ) dispatch( setMessage(value) );


    input.value = "";
  };

  /* 바인드: 토글 (STT 녹음)
  */ 
  return (<>
    <form className="form" action="" onSubmit={formSubmit}>
      {/* Filter 영역 */}
      <div className="chat-prompter-form-filter form-filter">
        {/* 컴포넌트 : 채팅 프롬프트 폼 필터  */}
        <ChatPrompterFormFilter /> 
      </div>
      
      {/* Input 영역 */}
      <div className="chat-prompter-input-wrap">
        <div className="chat-prompter-input" id="chat-prompter-input">
          
          <div className="input-wrap d-flex align-items-center rounded-pill">
            
            {/* 버튼 : STT */}
            <RecordToggleButton callbackSTT={callbackSTT}/>
            
            {/* 버튼 : SUBMIT */}
            <button type="submit" className="btn btn-has-icon btn-search btn-unstyled icon-btn flex-grow-0 flex-shrink-0">
              <i className="im icon-search"></i>
            </button>

            <input ref={inputPromptRef} type="text" className="form-control form-control-unstyled" name="s" placeholder="..." onFocus={inputFocus} onBlur={inputBlur} onKeyDown={inputKeyDown} />

            {/* 버튼 : 이미지 업로드 버튼 */}
            <UploadImageButton />

          </div>

        </div>
      </div> {/* .chat-prompter-input-wrap */}
        
    </form> {/* .form */}
  </>);
}