/**
 * 컴포넌트 : 버튼 : 이미지 업로드 버튼
 */
import * as Commons from "../../../public/assets/js/commons";

import { ChangeEvent, useEffect, useRef } from "react";
import * as FetchFileUploader from "../../utils/fetchs/fetchFileUploader";


interface IProp {
  callback?: (message: string) => void
}


/**
 * UI - 버튼 : 이미지 업로드
 */
export default function UploadImageButton( prop: IProp ) {
  

  // const [ speechRec, setSpeechRec ] = useState<any >(null);
  // const inputFileHandlerRef = useRef<HTMLButtonElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handlerOnClick = ( e: any  ) => {
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

    const files = input.files;

    if ( prop?.callback ) prop.callback( "당뇨병" ); // ***

    // FetchFileUploader.uploadFileToOCR( files, ( resp ) => {

    //   if ( ! resp ) return;

    //   const ocr_raw = resp['ocr_raw'] ? resp['ocr_raw'] : null;
    //   const gpt_analysis = resp['gpt_analysis'] ? resp['gpt_analysis'] : null;

    //   console.log(ocr_raw);


      
      
    // } );

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