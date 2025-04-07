/**
 * 컴포넌트 : 엔트리 - 채팅 세션
 */
// import shortid from 'shortid';

import React from "react";

import Loader from "../common/Loader";

import * as IF from "../../utils/interfaces";
import { Link } from "react-router-dom";
import * as Commons from "../../../public/assets/js/commons";

/* 컴포넌트 속성 인터페이스
*/
interface IProp {
  data: IF.IDataChatSession, // - useRef
  dateformat?: string
}

export default function ChatSessionEntry ( props: IProp ) {

  const data = props.data;

  const dateformat = props.dateformat ? props.dateformat : "yyyy-MM-dd";

  const isPicture = data.member.meta && data.member.meta.find(meta => meta.meta_key === "picture") ? true : false;

  const metaPicture = isPicture ? data.member.meta.find(meta => meta.meta_key === "picture")?.meta_value : null;
  
 

  return (<>

    <Link to={`/c?sid=${data.id}`} className="a-wrap entry-card-wrap">
      <article className="entry-card type-chat-session status-publish format-standard has-post-thumbnail hentry">


        <figure className="entry-card-thumb card-thumb no-image">

          { metaPicture && <img src={metaPicture} className="entry-card-thumb-image card-thumb-image wp-post-image" alt="" decoding="async" loading="lazy" /> }

          { ! metaPicture && <i className="fa-solid fa-circle-user"></i> }

        </figure>
        <div className="entry-card-content card-content">
          <div className="d-flex align-items-start justify-content-between">
            <div>
              <h2 className="entry-card-title card-title mb-0" itemProp="headline">
                { data.lastQuestion ?? "빈 대화 세션입니다." }
              </h2>
              <div className="entry-card-excerpt">
                <p className="mb-0">{ data.member && data.member.email }</p>
              </div>
            </div>
            <div className="entry-card-meta bottom">
              <div className="entry-card-info">
                <div className="post-date">
                  <i className="fa-regular fa-clock me-1"></i>
                  <span className="entry-date">{ data.updated_at ? Commons.formatDateTimeByISO8601(data.updated_at, dateformat) : "-" }</span>
                </div>
                <div className="post-count">
                  <i className="fa-solid fa-hashtag me-1"></i>
                  <span className="entry-count">{ data.count }</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </article>
    </Link>

  </>);
}
