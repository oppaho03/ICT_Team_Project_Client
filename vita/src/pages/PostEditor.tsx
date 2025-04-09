/**
 * 페이지: 로그인
 */
import * as Commons from "../../public/assets/js/commons";
import * as IF from "../utils/interfaces";

import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useSelector, } from "react-redux";

import { v4 as uuidv4 } from 'uuid';

// import * as uiSlice from "../store/uiSlice";
// import * as FetchChatSession from "../utils/fetchs/fetchChatSession";
// import BlockNotFound from "../componenets/headline/BlockNotFound";
import ContentHeadline from "../componenets/headline/ContentHeadline";

import FieldsetPostEditor from "../componenets/fieldset/FSPostEditor";
import { PostEditorFormDataContext, PostEditorFormDataDefaultValue } from "../utils/contexts/contextPostEditor";


export default function PostEditor() {

  const UI = useSelector( (state: any) => state.ui );
  // const dispatch =  useDispatch();
  const dataContext = useContext( PostEditorFormDataContext );

  const formRef = useRef<HTMLFormElement>(null);

 

  const onSubmit = ( e: FormEvent ) => {

    e.preventDefault();

    const editor = dataContext.editor;
    if ( editor ) {
      console.log(editor.getContents());
      console.log(editor.root.innerHTML);
    }

  };
  

  useEffect(() => {

    

    return () => {
    }
    
  }, [] );

  return (<>
    <section className="section d-flex flex-column justify-content-center align-items-center" id="edit-content-container">

      <div className="container">

        <ContentHeadline title={"에디터"} />

        <div className="content" id="edit-content">
          <div className="form-wrap">
            <form ref={formRef} className="form form-type-modal form-post-edit" role="form" tabIndex={-1} action="/signin" method="post" onSubmit={onSubmit} style={ {maxWidth: 'none'} }> 

              <div className="form-body">
                <PostEditorFormDataContext.Provider value={PostEditorFormDataDefaultValue} >
                  <FieldsetPostEditor />
                </PostEditorFormDataContext.Provider>
              </div>

            </form>
          </div>
        </div> {/* form-wrap */}

      </div>
    </section>

  </>);
};