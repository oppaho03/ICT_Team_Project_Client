/**
 * 페이지: 로그인
 */
import * as Commons from "../../public/assets/js/commons";
import * as IF from "../utils/interfaces";

import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useSelector, } from "react-redux";

import ContentHeadline from "../componenets/headline/ContentHeadline";

import FieldsetPostEditor from "../componenets/fieldset/FSPostEditor";
import { PostEditorFormDataContext, PostEditorFormDataDefaultValue } from "../utils/contexts/contextPostEditor";
import * as FetchPosts from "../utils/fetchs/fetchPosts";
import { useLocation, useNavigate } from "react-router-dom";


export default function PostEditor() {

  const location = useLocation();
  const navigate = useNavigate();

  const UI = useSelector( (state: any) => state.ui );
  // const dispatch =  useDispatch();
  const dataContext = useContext( PostEditorFormDataContext );

  const formRef = useRef<HTMLFormElement>(null);
  

  useEffect(() => {

    const form = formRef ? formRef.current : null;
    if ( form ) dataContext.form = form;

    /**
     * 폼 데이터 검사 
     * @returns 
     */
    dataContext.isChecked = (): boolean => {
      let checked = true; 

      if ( ! form ) return false;

      // [필수] input 모두 불러오기
      const inputs : NodeListOf<HTMLInputElement> = form.querySelectorAll( 'input[data-required="1"]' );

      for ( const input of inputs ) {

        const _name = input.name;
        
        if ( ! input.value.trim().length ) checked = false;

        if( ! checked ) {
          input.focus();
          break;
        } //

      } // end for
      
      return checked;
    }
    
    return () => {
    }
    
  }, [] );

  const onSubmit = ( e: FormEvent ) => {

    e.preventDefault();

    const form = e.target as HTMLFormElement; 

    /// 폼 데이터 검사
    if ( ! dataContext.isChecked() ) {
      return; 
    }

    /// 에디터 
    const editor = dataContext.editor;
    let post_content = editor ? editor.root.innerHTML : ""; // editor.getContents() | editor.root.innerHTML

    /// 폼 데이터 검사 - 성공
    const formData = new FormData(form); 
    const requestData = new FormData();
    if ( post_content != "" ) 
      requestData.append( 'post_content', post_content ); /// 포스트 컨텐츠 등록
    for( const [ key, value ] of formData.entries() ) {

      if( key == 'category' ) {

        if ( value == "" ) {
          window.modalAlter( "카테고리를 선택해야 합니다." );
          return;
        }
        else requestData.append( 'cids[]', value );
      }
      else if ( value != "" ) requestData.append(  key, value ); // 데이터 키&값 추가
    }

    
    

    FetchPosts.savePost( requestData, (resp) => { // 회원 가입

      if ( ! resp && ! resp.id  ) {
        const modal = window.modalAlter( `"${requestData.get("post_title")}" 글에 대한 에디터를 완료하지 못했습니다. <br> 관리자에게 문의 또는 잠시 후 다시 시도해주세요` );
      }
      else {
        const modal = window.modalAlter( `"${requestData.get("post_title")}" 글이 성공적으로 등록 되었습니다.` );
        if ( modal ) {
          window.modalBindClosed( modal, () => { navigate(location.pathname, { replace: true }); } );
        }
      }
      
    } );

  };

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