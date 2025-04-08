/**
 * 페이지: 로그인
 */
import * as Commons from "../../public/assets/js/commons";
import * as IF from "../utils/interfaces";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { v4 as uuidv4 } from 'uuid';

// import * as uiSlice from "../store/uiSlice";
// import * as FetchChatSession from "../utils/fetchs/fetchChatSession";
// import BlockNotFound from "../componenets/headline/BlockNotFound";
import ContentHeadline from "../componenets/headline/ContentHeadline";

import FieldsetPostEditor from "../componenets/fieldset/FSPostEditor";



export default function PostEditor() {

  const UI = useSelector( (state: any) => state.ui );
  const dispatch =  useDispatch();

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = ( e: FormEvent ) => {};
  

  useEffect(() => {



    return () => {
    }
    
  }, [] );

  return (<>
    <section className="section d-flex flex-column justify-content-center align-items-center" id="chat-sessions">

      <div className="container">

        <ContentHeadline title={"공개 채팅 세션 목록"} />

        <div className="content content-list" id="chat-sessions-list">
          <div className="form-wrap">
            <form ref={formRef} className="form form-type-modal form-edit" role="form" tabIndex={-1} action="/signin" method="post" onSubmit={onSubmit} style={ {maxWidth: 'none'} }> 

              <FieldsetPostEditor />

            </form>
          </div>
        </div> {/* form-wrap */}

      </div>
    </section>

  </>);
};