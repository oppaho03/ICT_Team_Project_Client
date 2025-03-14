/**
 * 컴포넌트 : 채팅 프롬프트 폼
 */
// import shortid from 'shortid';
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFocus, setActive, setMessage } from "../../store/chatPromptSlice"

import { IDataCategory } from "../../interfaces";
import { fetchAsyncTermsAllCategory } from "../../utils/fetchs";
import { TermsContext } from "../../contexts";

import ChatPrompterFormFilter from "./ChatPrompterFormFilter";
import { useNavigate } from "react-router-dom";
import RecordToggle from "../button/RecordToggle";

export default function ChatPrompterForm ( ) {

  const [ dataDept , setDataDept] = useState<Array<IDataCategory>>([]);
  const [ dataDiseases , setDataDiseases] = useState<Array<IDataCategory>>([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const prompt = useSelector( (state: any) => state.prompt );

 
  useEffect(() => {
    /* 데이터 초기화 - 진료과 / 질병
    */ 
    fetchAsyncTermsAllCategory( "department", ( dataset: Array<IDataCategory> | null ) => setDataDept( ! dataset ? [] : dataset ) );
    fetchAsyncTermsAllCategory( "disease", ( dataset: Array<IDataCategory> | null ) => setDataDiseases( ! dataset ? [] : dataset ) );

    if ( ! prompt.active ) inputPromptRef.current?.blur(); // 포커스 아웃 

  }, [ prompt.active ] );

  const inputPromptRef = useRef<HTMLInputElement>(null); // INPUT : 채팅 프롬프트 입력란

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

    const input = inputPromptRef ? inputPromptRef.current : null;
    if ( ! input || input.value.trim() == "" ) return;

    if ( ! prompt.active ) {
      dispatch( setActive(true) ); // 채팅 프롬프트 활성화 - 대화 시작
      navigate("/c"); // /c 이동
    }

    if ( prompt.latestMessage != input.value )
      dispatch( setMessage( input.value ) );
    input.value = "";
  };

  /* 바인드: 토글 (STT 녹음)
  */ 
  
  
  return (<>
    <form id="" className="form" action="" onSubmit={formSubmit}>
      {/* Filter 영역 */}
      <div className="chat-prompter-form-filter form-filter">
        <TermsContext.Provider value={ { ...useContext(TermsContext), ...{ departments: dataDept, diseases: dataDiseases } } }>
          {/* 컴포넌트 : 채팅 프롬프트 폼 필터  */}
          <ChatPrompterFormFilter /> 
        </TermsContext.Provider>
      </div>
      
      {/* Input 영역 */}
      <div className="chat-prompter-input-wrap">
        <div className="chat-prompter-input" id="chat-prompter-input">
          
          <div className="input-wrap d-flex align-items-center rounded-pill">
            {/* 버튼 : STT */}
            <RecordToggle />
            
            {/* 버튼 : SUBMIT */}
            <button type="submit" className="btn btn-has-icon btn-search btn-unstyled icon-btn flex-grow-0 flex-shrink-0">
              <i className="im icon-search"></i>
            </button>

            <input ref={inputPromptRef} type="text" className="form-control form-control-unstyled" name="s" placeholder="..." onFocus={inputFocus} onBlur={inputBlur} onKeyDown={inputKeyDown}/>

          </div>

        </div>
      </div> {/* .chat-prompter-input-wrap */}
        
    </form> {/* .form */}
  </>);
}