/**
 * 컴포넌트 : 채팅 프롬프트 폼 필터
 */

import { useContext, useEffect } from "react";
import { TermsContext } from "../../utils/contexts";
// import { useSelector } from "react-redux";

// import * as Common from "../../../public/assets/js/commons";

// declare var gsap: any | null; // GSAP 코어 객체
// if ( typeof gsap == 'undefined' || ! gsap ) gsap = null;

export default function ChatPrompterFormFilter ( ) {

  const DataTerms = useContext(TermsContext);

  let order = 1;

  // const ui = useSelector( (state: any) => state.ui );

  // useEffect( () => {

  //   /* 채팅 프롬프트 포커스 인
  //   */ 
  //   if ( gsap ) {
  //     if ( ui.prompt ) {
        
  //     }
  //     else {
        
  //     }
  //   } 
  //   else {
      
  //   }

  //   console.log( ui.prompt )
    
  // }, [ ui.prompt ] );


  return (<>
    <div className="filter-wrap"> 
      <div className="filter filter-bar">
        <div className="filter-inner filter-bar-inner row flex-row flex-nowrap justify-content-between mx-0">

          <div className="col-auto d-flex align-items-center gap-2">
           
            {/* 진료과목 */}
            <div className="form-control form-select" data-order={order} >
              <p className="form-caption underline"><label>진료과목</label> </p>
              <select name="department">
                <option value="">전체</option>
                { /* 진료과목 그리기 */
                  DataTerms.departments 
                  && DataTerms.departments.map( (term, i) => {
                    return  <option key={i} value={term.id}>{ term.name }</option>;
                  } ) 
                }
              </select>
            </div> 

            {/* 진료과목 */}
            <div className="form-control form-select" data-order={++order} >
            <p className="form-caption underline"><label>진료과목</label> </p>
              <select name="disease">
                <option value="">전체</option>
                { /* 진료과목 그리기 */
                  DataTerms.diseases 
                  && DataTerms.diseases.map( (term, i) => {
                    return  <option key={i} value={term.id}>{ term.name }</option>;
                  } ) 
                }
              </select>
            </div>

          </div> {/* col */}

          <div className="col-auto d-flex align-items-center gap-2" >
            {/* 채팅 프롬프트 공개 / 비공개 토글 */}
            <div className="form-check form-switch" data-order={++order}>
              {/* <p class="form-caption"><label>대화 공개</label> </p> */}
              {/* <label class="form-check-label" for="">폼 공개</label> */}
              <input className="form-check-input" type="checkbox" role="switch" id="" name="status" value="1" />
            </div>
          </div> {/* col */}

        </div>
      </div>
    </div>
  </>);
}