/**
 * 컴포넌트 : 채팅 프롬프트 폼 필터
 */

import { ChangeEvent, useContext } from "react";
import { ChatPromptFilterContext } from "../../utils/contexts/contextChatPrompt";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../../store/chatPromptSlice";

// import * as Common from "../../../public/assets/js/commons";

// declare var gsap: any | null; // GSAP 코어 객체
// if ( typeof gsap == 'undefined' || ! gsap ) gsap = null;

export default function ChatPrompterFormFilter ( ) {

  const DataFilter = useContext(ChatPromptFilterContext);
  
  const dispatch = useDispatch();
  const prompt = useSelector ( (state: any) => state.prompt );

  let order = 1;

  // <select> 진료과목 / 질병종류 
  const onChanged = (e: ChangeEvent) => {
    const t = e.target as HTMLSelectElement;
    const name = t.name;
    
    let value = t.value; // <option> 값
    let text = t.options[t.selectedIndex].text; // <option> 라벨

    
    if ( ["department", "disease" ].includes(name)  ) 
      dispatch(setFilters( { key: name, value: { id: value == "" ? 0 : parseInt(value), name: text }  } ));

  };

  return (<>
    <div className="filter-wrap"> 
      <div className="filter filter-bar">
        <div className="filter-inner filter-bar-inner row flex-row flex-nowrap justify-content-between mx-0">

          <div className="col-auto d-flex align-items-center gap-2">
           
            {/* 진료과목 */}
            <div className="form-control form-select" data-order={order} >
              <p className="form-caption underline"><label>진료과목</label> </p>
              <select name="department" onChange={onChanged}>
                <option value="">전체</option>
                { /* 진료과목 그리기 */
                  DataFilter.departments 
                  && DataFilter.departments.map( (term, i) => {
                    return  <option key={i} value={ term.id ?? "" }>{ term.name }</option>;
                  } ) 
                }
              </select>
            </div> 

            {/* 질병종류 */}
            <div className="form-control form-select" data-order={++order} >
            <p className="form-caption underline"><label>질병종류</label> </p>
              <select name="disease" onChange={onChanged}>
                <option value="">전체</option>
                { /* 진료과목 그리기 */
                  DataFilter.diseases 
                  && DataFilter.diseases.map( (term, i) => {
                    return  <option key={i} value={ term.id ?? "" }>{ term.name }</option>;
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