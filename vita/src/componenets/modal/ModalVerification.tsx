/**
 * 컴포넌트 : 모달 - 이메일 인증 
 */
import * as Commons from "../../../public/assets/js/commons";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import SVGLogoWhite from "../svgLogoWhite";


interface Props {
  length: number;
}

function setCountTime ( target: HTMLElement | null, total: number ): number {

  let sec = 0;
  let min = 0;


  if ( total > 0 ) {
    min = Math.floor( total / 60 );
    sec = total - ( min * 60 );
  }


  if ( target ) 
    target.innerHTML = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;

  return total - 1;
}

export default function ModalVerification ( { length = 6 }: Props ) {

  const modal = useRef<HTMLDivElement | null>(null);
  const outputCountTime = useRef<HTMLElement | null>(null);

  let timerCountTime: NodeJS.Timeout | null = null; 


  useEffect(() => {


    if (  modal ) {

      /* 모달 : 열림
      */ 
      Commons.setEventListener( modal.current, 'show.bs.modal', () => { // modal.opened

        // 
        const t = modal && modal.current ? modal.current : null;
        

        // 입력 시간 카운트 
        const output = outputCountTime && outputCountTime.current ? outputCountTime.current : null;
        
        if ( timerCountTime == null ) {
          let total_count = 300;
          total_count = setCountTime( output, total_count ); 
          timerCountTime = setInterval( () => {
            total_count = setCountTime( output, total_count ); 

            if ( total_count < 0  && t) {
              // 카운트 종료 
              
              // '코드(Digit)' 초기화
              for ( const input of t.querySelectorAll("input.input-digit") as NodeListOf<HTMLInputElement> ) {
                input.disabled = true;
              }

               // 카운트 종료 - 타이머 중지
              if ( timerCountTime != null ) clearTimeout(timerCountTime);
              timerCountTime = null;
            }
            else return;
          }, 1200);
        } 
        
      }, {} );

      /* 모달 : 닫힘
      */ 
      Commons.setEventListener( modal.current, 'hidden.bs.modal', () => {
        // modal.closed
        const t = modal ? modal.current : null;
        if ( t == null ) return;

        // '코드(Digit)' 초기화
        for ( const input of t.querySelectorAll("input.input-digit") as NodeListOf<HTMLInputElement> ) {
          input.value = '';
          input.disabled = false;
        }

        // 타이머 초기화 
        if ( timerCountTime != null ) clearInterval( timerCountTime );
        timerCountTime = null;

      }, {} );

    } // modal
    

    // 
    
  }, []);

  /* 바인드 : 키 들림
  */
  const handlerKeyUp = ( e: KeyboardEvent<HTMLInputElement> ) => {
    const t = e.target as HTMLInputElement

    let key = e.key ?? null;
    if ( key ) key = key.replace( /[^0-9]/g, '' );

    if ( key && key.length ) t.value = key;
    else t.value = t.value.replace( /[^0-9]/g, '' );  

    // 포커스 이동
    if ( t.value.length && t.nextElementSibling ) {
      const _next = t.nextElementSibling as HTMLInputElement;
      _next?.focus();
    }

  };

  /* 코드 입력 창 (digit) 생성
  */
  const inputs = [];
  for( let i = 0; i < length; i ++ ) {
    inputs.push( <input key={i} type="text" className="form-control text-center input-digit" maxLength={1} placeholder="0" onKeyUp={handlerKeyUp}></input> );
  }

  return (<>
    <div ref={modal} className="modal fade" id="modal-verification" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}  aria-labelledby="modal-verification-label" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <span className="modal-header__branding"> <SVGLogoWhite /> </span>
            <h1 className="modal-title fs-5 fw-bold text-end" id="modal-verification-label">인증 코드 입력</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <p> 인증코드를 입력해주세요. <small>/ 입력 시간 : <span ref={outputCountTime} className="text-danger fw-bold">-</span> </small></p>
            </div>
            {/* verification */}
            <div className="row mx-0">
              <div className="input-wrap input-digit-group d-flex justify-content-center gap-2">
                <input type="hidden" name="verification"></input>
                { /* 코드 입력 창 (digit) */ inputs }
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="button" className="btn" data-bs-dismiss="modal">닫기</button>
            <button type="button" className="btn btn-primary">인증하기</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}