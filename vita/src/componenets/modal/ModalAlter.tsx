/**
 * 컴포넌트 : 모달 - 이메일 인증 
 */
import * as Commons from "../../../public/assets/js/commons";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import SVGLogoWhite from "../svgLogoWhite";
import { setModal } from "../../store/uiSlice";
import { useDispatch } from "react-redux";


interface Props {
  message: string;
}


export default function ModalAlter ( { message = "" }: Props ) {

  const dispatch = useDispatch();

  const modal = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (  modal ) {

      /* 모달 : 열림
      */ 
      Commons.setEventListener( modal.current, 'show.bs.modal', () => { // modal.opened

        console.log(modal);
        console.log(modal.current);
        const t = modal && modal.current ? modal.current : null;
        if ( t == null ) return;

        dispatch( setModal(true) ); // 모달 - 열림
        
      }, {} );

      /* 모달 : 닫힘
      */ 
      Commons.setEventListener( modal.current, 'hidden.bs.modal', () => {
        // modal.closed
        const t = modal ? modal.current : null;
        if ( t == null ) return;

        dispatch( setModal(false) ); // 모달 - 닫힘

      }, {} );

    } // modal
    
  }, []);

  /* 바인드 : 키 들림
  */
  const handlerKeyUp = ( e: KeyboardEvent<HTMLInputElement> ) => {
    const t = e.target as HTMLInputElement

    let key = e.key ?? null;
    if ( key ) key = Commons.formatNumbers( key );

    if ( key && key.length ) t.value = key;
    else t.value = Commons.formatNumbers( t.value );

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
    <div ref={modal} className="modal fade" id="modal-alter" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}  aria-labelledby="modal-alter-label" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <span className="modal-header__branding"> <SVGLogoWhite /> </span>
            <h1 className="modal-title fs-5 fw-bold text-end" id="modal-alter-label">알려드립니다.</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <p > {message} </p>
            </div>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="button" className="btn" data-bs-dismiss="modal">닫기</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}