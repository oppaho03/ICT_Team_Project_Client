/**
 * 컴포넌트 : 필드셋 - 포스트 에디터
 */

import { useEffect, useState } from "react";
import Editor from "../common/Editor";

import * as FetchTerms from "../../utils/fetchs/fetchTerms";
import { IDataCategory } from "../../utils/interfaces";

export default function FieldsetPostEditor () {

  const [ categories, setCategories ] = useState<IDataCategory[]>([]);

  const commantStatusOnChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const t = e.target as HTMLInputElement;
    const value = t.checked ? t.dataset['checked'] : t.dataset['unchecked'];

    const input : HTMLInputElement | null = t.nextElementSibling as HTMLInputElement | null;
    if ( input ) input.value = value ? value : "OPEN";
  };

  /**
   * useEffect (초기화)
   */
  useEffect( () => {

    // 루트 용어(카테고리) 
    FetchTerms.findBySlug( "post", "post", parent => {

      if ( parent && parent.id ) { // 루트 용어(카테고리)의 하위 용어(카테고리) 검색
        FetchTerms.findByParentId( parent.id, dataset => { setCategories( dataset ? dataset : [] ); } );
      }
      else setCategories([]);

    } );

  }, [] );


  return ( <>
  <fieldset> 
    <legend>
      {/* <div className="form-heading">
        <h2>로그인</h2>
      </div> */}
    </legend>

    {/* 필드 그룹 */}
    <div className="form-control-field-wrap d-lg-flex gap-4">
      {/* 글: 카테고리 */}
      <div className="form-control-field field-category d-lg-flex align-items-lg-center align-content-lg-start col-lg-4 flex-lg-grow-1 flex-lg-shrink-1 gap-2">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label">카테고리</label>
        </div>
        <div className="form-control-field__input-container flex-lg-grow-1 flex-lg-shrink-1">
          <div className="form-control form-select" >
            <select name="category" data-required="1">
              <option value="">카테고리를 선택해주세요.</option>
              { categories.map( (cat, cati) => {
                return <option key={cati} value={cat.id ? cat.id : ""}>{cat.name}</option>
              } )
              }
            </select>
          </div>
        </div>
      </div>
    
      {/* 글: 상태관리 */}
      <div className="form-control-field field-post_name d-lg-flex justify-content-lg-end align-items-lg-center align-content-lg-start col-lg-4 flex-lg-grow-1 flex-lg-shrink-1 gap-2">
        <div className="form-control-field__label-container">
          <label className="form-control-field__label">상태 관리</label>
        </div>
        <div className="d-flex mt-4 mt-lg-0 gap-2">
          <div className="form-control-field__input-container flex-lg-grow-0 flex-lg-shrink-0">
            <div className="form-check form-switch" >
              <p className="form-caption"><label>글 공개</label> </p>
              {/* <label className="form-check-label">폼 공개</label> */}
              <input className="form-check-input" type="checkbox" role="switch" id="" name="post_status" value="PUBLISH" data-checked="PUBLISH" data-unchecked="PRIVATE" checked disabled/> 
              {/* onChange={onToggledChatSessionStatus} checked={isOpened} */}
            </div> 
          </div>
          <div className="form-control-field__input-container flex-lg-grow-0 flex-lg-shrink-0">
            <div className="form-check form-switch" >
              <p className="form-caption"><label>답글 허용</label> </p>
              {/* <label className="form-check-label">폼 공개</label> */}
              <input className="form-check-input" type="checkbox" role="switch" id="" value="OPEN" data-checked="OPEN" data-unchecked="OPEN" onChange={commantStatusOnChange} /> 
              <input type="hidden" name="commant_status" value="OPEN" />
              {/* onChange={onToggledChatSessionStatus} checked={isOpened} */}
            </div> 
          </div>
        </div>
      </div>

    </div>

    {/* 글: 제목 */}
    <div className="form-control-field field-post_title">
      <div className="form-control-field__input-container">
        <input type="text" className="form-control" name="post_title" placeholder="제목" data-is-validation='0' data-required='1' />
      </div>
    </div>

    {/* 글: 내용 */}
    <div className="form-control-field field-post_content">
      <div className="form-control-field__input-container">
        <Editor />
      </div>
    </div> 

    {/* 글: 이름 */}
    <div className="form-control-field field-post_name">
      <div className="form-control-field__label-container">
        <label className="form-control-field__label">이름</label>
      </div>
      <div className="form-control-field__input-container">
        <input type="text" className="form-control" name="post_name" placeholder="" data-is-validation='0' />
      </div>
    </div>

    {/* 글: 요약 */}
    <div className="form-control-field field-post_summary">
      <div className="form-control-field__label-container">
        <label className="form-control-field__label">요약</label>
      </div>
      <div className="form-control-field__input-container">
        <textarea className="form-control" name="post_summary"></textarea>
      </div>
    </div>

  
    {/*  */}

    {/* <div className="form-control-field field-password">
      <div className="form-control-field__label-container">
        <label className="form-control-field__label">카테고리</label>
      </div>
      <div className="form-control-field__input-container">
        <input type="password" className="form-control" name="password" placeholder="****" data-is-validation='0' required />
      </div>
    </div> */}

    <div className="form-control-field field-submit">
      <div className="form-control-field__input-container">
        <button type="submit" className="btn btn-primary w-100" >저장하기</button>
      </div>
    </div>

  </fieldset> 
  </>);
}