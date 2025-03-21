/**
 * 컴포넌트 : 채팅 프롬프트 폼 필터
 */

import { useContext, useEffect } from "react";
import { TermsContext } from "../../contexts";
import axios from "axios";
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

  const handleChange = (e: any) => {

    axios.get('http://192.168.0.87:8080/wc', {})
    .then(function (response) {
      console.log(response);
      if (response.status === 302) {
        window.location.href = response.headers.location;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  //   try {
  //     const url = "https://192.168.0.5:8080/wc";
  //     const datas = {  }
  //     const options = {
  //       headers: {
  //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5TVE9SIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJzdWIiOiIxIiwiaWF0IjoxNzQxMDUxMDQ0LCJleHAiOjE3NDEwNTE5NDR9.xTVxV2BHe6qHaM8WjApKvoOnyt_LySjTk0CNRi35rEY',
  //         'Content-Type': 'application/json'
  //       }
  //     };
  //     const response = await fetch( url, {
  //       method: 'POST',
  //       body: JSON.stringify( datas ),
  //       headers: options.headers
  //     } );`

  //     console.log(response);
  //   }
  //   catch ( err: Error | any ) {
  //     console.log( err );
      
  //   }
  // };


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
              <input className="form-check-input" type="checkbox" role="switch" id="" name="status" value="1" onChange={handleChange} />
            </div>
          </div> {/* col */}

        </div>
      </div>
    </div>
  </>);
}