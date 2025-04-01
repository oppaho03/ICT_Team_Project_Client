/**
 * 컴포넌트 : 버튼 : 이미지 업로드 버튼
 */
import * as Commons from "../../../public/assets/js/commons";

import { ChangeEvent, useEffect, useRef } from "react";
import * as FetchFileUploader from "../../utils/fetchs/fetchFileUploader";


/**
 * UI - 버튼 : 이미지 업로드
 */
export default function UploadImageButton() {
  

  // const [ speechRec, setSpeechRec ] = useState<any >(null);
  // const inputFileHandlerRef = useRef<HTMLButtonElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handlerOnClick = ( e: any  ) => {
    const input = inputFileRef?.current;
    if ( input ) input.click();
  }

  const onChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    
    const input = e.target as HTMLInputElement;
    if ( !input || ! input.files || input.files.length == 0 ) return; 

    FetchFileUploader.uploadFileToOCR( input.files, ( resp ) => {
      console.log(resp);
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