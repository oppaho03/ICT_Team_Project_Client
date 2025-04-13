/**
 * 페이지: 로그인
 */
import * as Commons from "../../public/assets/js/commons";
import * as IF from "../utils/interfaces";

import { useEffect, useRef, useState } from "react";
import { useSelector, } from "react-redux";

import ContentHeadline from "../componenets/headline/ContentHeadline";
import { useParams } from "react-router-dom";
import * as FetchTerms from "../utils/fetchs/fetchTerms";
import * as FetchPosts from "../utils/fetchs/fetchPosts";
import Post from "../componenets/common/Post";


export default function Posts() {

  const UI = useSelector( (state: any) => state.ui );

  const { slug } = useParams();

  const [ posts, setPosts ] = useState<IF.IDataPost[]>([]);
  const [ lastPaged, setLastPaged ] = useState<boolean>(false);

  let category = null as IF.IDataCategory | null;
  
  let entries = [] as IF.IDataPost[];

  const wrapper = document.getElementById("wrapper");
  let paged = 1;
  let count = "1";


  useEffect(() => {
    
    if ( wrapper ) {
      Commons.setEventListener(wrapper, "scroll", onScroll, {});
    }

    if ( slug ) {
      FetchTerms.findBySlug( slug, "category", cat => {  // 루트 용어(카테고리) 
        category = cat; 
        if ( cat && cat.id ) updatePosts( cat.id );
      });
    }

    return () => {
      if ( wrapper ) {
        Commons.resetEventListener(wrapper, "scroll", onScroll);
      }
    }
    
  }, [] );

   /**
   * #wrapper 스크롤 (페이징)
   * @param e 
   * @returns 
   */
   const onScroll = ( e: any ) => {
    
    const t = e.target as HTMLDivElement;

    if ( window.isScrollYEnded(t) ) {
      if ( paged > 0 && category && category.id ) updatePosts( category.id );
    }

  };

  /**
   * 
   */
  const updatePosts = ( category_id: number ) => {

    FetchPosts.findByCategory( category_id, paged, 10, datas => {

      if ( ! datas ) datas = []; 

      entries = entries.concat( datas );
      setPosts( entries );

      if ( ! datas || ! datas.length ) paged = -1;
      else paged ++;

      setLastPaged( paged < 1 ? true : false );
      
    } );

  };
  


  return (<>
    <section className="section d-flex flex-column justify-content-center align-items-center" id="posts">
    
      <div className="container">

        <ContentHeadline title={"최신 뉴스"} />

        <div className="content content-list" id="posts-list">
    
          <ul className="menu menu-list list-unstyled" role="menu" itemScope itemType="https://schema.org/ItemList">
            {/* 아이템 생성 */}
            { posts.map( (postItem, postItemIdx) => {
                return (
                  <li key={postItemIdx} className="menu-item" itemScope itemType="https://schema.org/ListItem" data-count={postItemIdx + 1}>

                    <Post data={postItem} dateformat="yyyy-MM-dd HH:mm:ss" />

                  </li>);
              } )
            }
          </ul>

        </div> {/* form-wrap */}

      </div>
    </section>
  </>);
};