/**
 * 컴포넌트 : 버튼 : 이미지 업로드 버튼
 */
import * as Commons from "../../../public/assets/js/commons";

import { ChangeEvent, useEffect, useRef } from "react";
import * as FetchFileUploader from "../../utils/fetchs/fetchFileUploader";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as uiSlice from "../../store/uiSlice";


interface IProp {
  callback?: (message: string) => void
}


/**
 * UI - 버튼 : 이미지 업로드
 */
export default function UploadImageButton( prop: IProp ) {
  
  const UI = useSelector( (state: any) => state.ui );
  const dispatch = useDispatch();

  // const [ speechRec, setSpeechRec ] = useState<any >(null);
  // const inputFileHandlerRef = useRef<HTMLButtonElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handlerOnClick = ( e: any  ) => {

    if ( ! window.isLoggedIn() ) { // - 로그인 상태 검사
      return window.modalOfSignin();
    }

    const input = inputFileRef?.current;
    if ( input ) input.click();
  }
  /**
   * 'File' 변경
   * @param e 
   * @returns 
   */
  const onChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    
    const input = e.target as HTMLInputElement;
    if ( !input || ! input.files || input.files.length == 0 ) return; 
    else window.onLoading(); // 로딩 - 시작
  
    const files = input.files;

    // if ( prop?.callback ) prop.callback( "당뇨병" ); // ***
    FetchFileUploader.uploadFileToOCR( files, ( resp ) => {

      if ( ! resp ) return;

      const gpt_analysis = resp['gpt_analysis'] ? resp['gpt_analysis'] : null;

      if ( ! gpt_analysis 
        || ! gpt_analysis.trim().length 
        || ( gpt_analysis.indexOf("약품") !== -1 || gpt_analysis.indexOf("니다.") !== -1 || gpt_analysis.indexOf("없는") !== -1 || gpt_analysis.indexOf("올바른") !== -1 )
      ) {

        let message = gpt_analysis &&  gpt_analysis.trim().length ? gpt_analysis : "이미지에서 약품 이름을 추출할 수가 없습니다. 다른 이미지로 재시도해주세요.";

        window.modalAlter( message );
      } 
      else {
        // - input 'file' 로 받은 값을, 
        let message = `<mark>OCR 분석 결과</mark><br/>${gpt_analysis}`;

        try {
          const reader = new FileReader();
          reader.onload = (e : any) => {

            const src = e.target.result;
            const append = `<span class="d-block ocr-resource-wrap"><img class="ocr-resource-img" src=${src} /></span>`;

            if ( prop.callback ) prop.callback( message + append );

            // - 종료 처리
            input.value = ""; // input[type=file] 초기화
            window.offLoading(); // 로딩 - 종료
          }
          reader.readAsDataURL( files[0] );
        }
        catch ( err ) {
          if ( prop.callback ) prop.callback( message );

          // - 종료 처리
          input.value = ""; // input[type=file] 초기화
          window.offLoading(); // 로딩 - 종료
        }

        return;
        
      }

      // - 종료 처리
      input.value = ""; // input[type=file] 초기화
      window.offLoading(); // 로딩 - 종료

    } );

    

  }

  /* useEffect 
  */
  useEffect( () => {
    
  }, []);


  return (<>
    <div className="input-file-wrap">
      <button type="button" className="btn btn-has-icon btn-recoder btn-unstyled rounded-pill flex-grow-0 flex-shrink-0" onClick={handlerOnClick} >
        <i className="fa-solid fa-image"></i>
      </button>
      <div className="input-file-content">
        <input type="file" accept="image/*" className="input-file" name="attachment" style={{ display: 'none' }} ref={inputFileRef} onChange={onChange}/>
      </div>
    </div>
  </>);
};