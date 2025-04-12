/**
 * 컴포넌트 : 엔트리 - 채팅 세션
 */
// import shortid from 'shortid';

import React from "react";

import Loader from "./Loader";

import * as IF from "../../utils/interfaces";
import { Link } from "react-router-dom";
import * as Commons from "../../../public/assets/js/commons";

/* 컴포넌트 속성 인터페이스
*/
interface IProp {
  data: IF.IDataPost, // - useRef
  dateformat?: string
}

export default function Post ( props: IProp ) {

  const data = props.data;

  const shareUrl = encodeURIComponent(window.location.origin + window.location.pathname + "?id" + data.id);
  const categories = data.categories;
  // if ( categories )

  const dateformat = props.dateformat ? props.dateformat : "yyyy-MM-dd";

  const isPicture = data.author.meta && data.author.meta.find(meta => meta.meta_key === "picture") ? true : false;

  const metaPicture = isPicture ? data.author.meta.find(meta => meta.meta_key === "picture")?.meta_value : null;
  
 
  return (<>

    <div className="article-wrap">
      <article id={`post-${data.id}`} className={`article post-${data.id} status-publish format-standard hentry`} itemProp="blogPost" itemType="https://schema.org/BlogPosting" data-clarity-region="article">
        <header className="article-header entry-header cf">
          
          { categories && categories.length &&
          <div className="entry-category-repr">
            <p className="post-category">
              { categories.map( (cat, i) => <span key={i} data-label-color={cat.slug}>{cat.name}</span> ) }
            </p>
          </div>
          }

          <hgroup className="hgroup"> 
            <h1 className="headline" title={data.post_title} aria-label={data.post_title} itemProp="headline">{data.post_title}</h1> 
          </hgroup>

          <div className="entry-meta entry-meta-under"> 
            <div className="entry-info d-flex align-items-center justify-content-between gap-3"> 
              <div className="post-author d-flex align-items-center gap-2">
                <figure className="author-image">
                  { metaPicture && <img src={metaPicture} alt={data.author.nickname} decoding="async" loading="lazy" /> }
                  { ! metaPicture && <i className="fa-solid fa-circle-user"></i> }
                </figure>
                <div className="author-name">
                  <Link to={`mailto:${data.author.email}`}> {data.author.email} </Link>
                </div>
              </div>
              <div className="post-date"> 
                <i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;
                <span>{ data.post_modified_at ? Commons.formatDateTimeByISO8601(data.post_modified_at, dateformat) : "-" }</span>
              </div>
            </div>
          </div>

          {/* <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-twitter"></i> */}

        </header>
        
        <div className="article-content entry-content cf" itemProp="mainEntityOfPage" dangerouslySetInnerHTML={{ __html: data.post_content ? data.post_content : `<p>내용이 없습니다.</p>` }}></div>

        <footer className="article-footer entry-footer cf">

            <div className="sns-share">
              <div className="sns-share-buttons sns-buttons d-flex justify-content-center align-items-center">
                <Link to={`https://twitter.com/intent/tweet?text=%E3%83%A1%E3%82%AD%E3%82%B7%E3%82%B3%E5%A4%A7%E4%BD%BF%E9%A4%A8%E3%81%A7%E9%96%8B%E5%82%AC%EF%BC%81%E7%AC%AC2%E5%9B%9E+%E3%80%8C%E3%82%BF%E3%82%B3%E3%82%B9%E3%81%AE%E6%97%A5+Celebration+Party+2025%E3%80%8D%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88+%E3%83%AC%E3%83%9D%E3%83%BC%E3%83%88&amp;url=${shareUrl}`} className="sns-button share-button twitter-button btn " target="_blank" rel="nofollow noopener noreferrer">
                  <i className="fa-brands fa-square-x-twitter"></i>
                </Link>
                
                <Link to={`//www.facebook.com/sharer/sharer.php?u=${shareUrl}`} className="sns-button share-button facebook-button btn" target="_blank" rel="nofollow noopener noreferrer">
                  <i className="fa-brands fa-square-facebook"></i>
                </Link>
              </div>
            </div>

        </footer> 
      </article>
    </div>


  </>);
}
