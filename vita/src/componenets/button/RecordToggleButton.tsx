import { useSelector, useDispatch } from "react-redux";
import { toggleRecording } from "../../store/chatPromptSlice";

import * as Commons from "../../../public/assets/js/commons";

import shortid from "shortid";
import { useEffect, useRef, useState } from "react";

import { SERVER_URL } from "../../utils/fetchs/all";
import * as FetchFileUploader from "../../utils/fetchs/fetchFileUploader";

interface IProp {
  callbackSTT?: ( message: string ) => void
}


// 인터페이스: 음성 녹음 데이터 
interface IAudioRecordData {
  stream: any | null,
  recorder: any | null, 
  chunks: any | null,
}
// 데이터: 음성 녹음 데이터
const AudioRecordData: IAudioRecordData = {
  stream: null,
  recorder: null, 
  chunks: [] as any,
}

/**
 * 녹음 : 시작 
 * - 보안 
 * - chrome://flags/#unsafely-treat-insecure-origin-as-secure
 * @return 
 */
async function onRecording() {

  const t = this ? this as HTMLButtonElement : null;

  try {

    await navigator.mediaDevices.getUserMedia({ audio: true })
    .then( (stream) => {
      AudioRecordData.stream = stream;
      AudioRecordData.recorder = new MediaRecorder(stream);
      
      // 바인드 : 녹음 시작
      AudioRecordData.recorder.ondataavailable = (e: any) => { 
        AudioRecordData.chunks.push(e.data); 
      };

      // 바인드 : 녹음 종료
      AudioRecordData.recorder.onstop = () => {
        const blob = new Blob( AudioRecordData.chunks, { 'type' : 'audio/ogg; codecs=opus' } ); // 오리지널 데이터

        AudioRecordData.chunks = [];
        const objectURL = URL.createObjectURL(blob);
     
        /* 녹음 파일 다운로드 
        */
        const fileName = `${Commons.formatDateTime('yyyyMMddHHmmss')}_${shortid.generate()}`;
        
        const a = document.createElement("a");
        if ( a ) {
          a.href = objectURL;
          a.download = fileName + ".ogg"; 
          a.style.visibility = "hidden";

          document.body.appendChild(a);
          // a.click();
          document.body.removeChild(a);
        }

        /* 파일 전송 
         * blob -> formdata 형식으로 전송 
         */ 
        const tmpFileName = `${Commons.formatDateTime('yyyyMMddHHmmss')}_${shortid.generate()}.ogg`;
        const formData = new FormData();
        formData.append( "file", blob, tmpFileName);

        FetchFileUploader.uploadFile( formData, ( resp ) => {

          if ( ! resp || ! resp.id  ) {
            console.log( "Can't upload file..." );
            return; 
          }

          // : 포스트 ID
          const post_id = resp.id; 

          // : 메타 정보 파싱 - 'url'
          const meta_URL = ( resp.meta ? resp.meta : [] ).filter( meta => meta.key == "url" );
          if ( meta_URL.length ) { // URL 정보 있음
            // - URL 정보 전송
            FetchFileUploader.extrSentiment( `${SERVER_URL}${meta_URL[0].value}`, ( result ) => {

              if ( ! result ) return; 
              else FetchFileUploader.addExtrSentimentResult(  { ...result, ...{ post_id } }, null );

            } );
          }



        } );
        

      };
      
      AudioRecordData.recorder.start(); // 녹음 시작
    } )
    .catch( (err) => {
      if ( t ) t.click();
      console.log('Error accessing the microphone: ' + err);
    } );
  }
  catch ( err ) {
    if ( t ) t.click();
    console.log(err);
    
  }
}

/**
 * 녹음 : 종료 
 * @return {void}
 */
function stopRecording(): void {
  if ( AudioRecordData.recorder ) AudioRecordData.recorder.stop();
  if ( AudioRecordData.stream ) 
    AudioRecordData.stream.getTracks().forEach( (track: { stop: () => any; }) => track.stop() );
}


/**
 * UI - 버튼 : 녹음
 */
export default function RecordToggleButton( prop: IProp ) {
  
  const dispatch = useDispatch();
  const prompt = useSelector( (state: any) => state.prompt ); 

  const handlerRef = useRef<HTMLButtonElement>(null);

  const [ speechRec, setSpeechRec ] = useState<any >(null);

  /* useEffect 
  */
  useEffect( () => {
    // SpeechRecognition 객체 생성
    setSpeechRec( ( srec: any  ) => { 

      srec = Commons.setSpeechRecognition(); 
      if ( srec != null ) {
        
        // SpeechRecognition.onspeechstart
        // - 음성 인식 객체 음성 감지 시작
        srec.onspeechstart = () => {};

        // SpeechRecognition.onspeechend
        // - 음성 인식 객체 음성 감지 종료
        srec.onspeechend = () => { 
          if ( handlerRef?.current ) 
            handlerRef.current.click(); 
          // srec.stop(); 
          // stopRecording(); // - 녹음 중단
        };

        // SpeechRecognition.onresult
        // - 음성 인식 객체 음성 반환 
        srec.onresult = (e: any) => {  
          console.log( e.results );

          const messages = Array.from( e.results ).map( (results: any) => results[0].transcript ).join('');

          if ( prop.callbackSTT ) prop.callbackSTT( messages );
        };

         // SpeechRecognition.onerror
        // - 음성 인식 객체 음성 반환 
        srec.onerror = (e: any) => { console.log( e.error ); };

      }

      return srec;
    } );
      
  }, []);


  /* 바인드 : 클릭, 서랍 메뉴 토글
  */
  const handleToggler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const t = e.target as HTMLButtonElement ;
    const tagName = t && t.tagName ? t.tagName.toLowerCase() : null;
    if ( tagName == "button" ) {

      if ( ! window.isLoggedIn() ) { // - 로그인 상태 검사
        return window.modalOfSignin();
      }
     
      const toggled = t.classList.toggle( 'toggled' );
      dispatch( toggleRecording() ); // toggled expanded drawable

      if ( toggled ) onRecording.call(t);
      else stopRecording();

      if ( speechRec ) {
        if ( toggled ) speechRec.start();
        else speechRec.stop();
      }
    }
    else {
      const btn = t.closest( "button" );
      if ( btn ) btn.click();
    }
  };

  return (<>
    <button ref={handlerRef} type="button" className="btn btn-has-icon btn-recoder btn-unstyled rounded-pill flex-grow-0 flex-shrink-0" onClick={handleToggler}>
      <i className="im icon-mic"></i>
    </button>
  </>);
};