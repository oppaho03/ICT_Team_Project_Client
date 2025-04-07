/**
 * 컴포넌트 : 엔트리 - 채팅 세션
 */
// import shortid from 'shortid';

import * as IF from "../../utils/interfaces";
import { Link } from "react-router-dom";
import * as Commons from "../../../public/assets/js/commons";

/* 컴포넌트 속성 인터페이스
*/
interface IProp {
  data: IF.IDataMember, // - useRef
  dateformat?: string
}

export default function MemberEntry ( props: IProp ) {

  const data = props.data;

  const dateformat = props.dateformat ? props.dateformat : "yyyy-MM-dd";

  const isPicture = data.meta && data.meta.find(meta => meta.meta_key === "picture") ? true : false;

  const metaPicture = isPicture ? data.meta.find(meta => meta.meta_key === "picture")?.meta_value : null;
  
  return (<>

    <div className="a-wrap entry-card-wrap">
      <article className="entry-card type-member status-publish format-standard has-post-thumbnail hentry">


        <figure className="entry-card-thumb card-thumb no-image">
          <Link to={`/members`}>
          { metaPicture && <img src={metaPicture} className="entry-card-thumb-image card-thumb-image wp-post-image" alt="" decoding="async" loading="lazy" /> }

          { ! metaPicture && <i className="fa-solid fa-circle-user"></i> }
          </Link>

        </figure>
        <div className="entry-card-content card-content">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h2 className="entry-card-title card-title mb-0" itemProp="headline">
                <b>{ data.nickname }</b> 님 환영합니다.
              </h2>
              <div className="entry-card-excerpt">
                <nav className="d-flex justify-content-start align-items-center">
                  <Link to={`#`} className="link link-has-icon link-unstyle p-0">
                    <i className="fa-solid fa-bell -icon"></i>
                  </Link> <Link to={`#`} className="link link-has-icon link-unstyle p-0">
                    <i className="fa-solid fa-envelope -icon"></i>
                  </Link>
                </nav>
              </div>
            </div>
            <div className="entry-card-meta bottom">
              <div className="entry-card-info">
                <div className="post-other">
                  <Link to={`/logout`} className="link link-has-icon link-unstyle">
                    <i className="fa-solid fa-power-off"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </article>
    </div>

  </>);
}
