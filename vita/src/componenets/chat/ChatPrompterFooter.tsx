/**
 * 컴포넌트 : 채팅 프롬프트 헤더
 */

import { useEffect, useRef, useState } from "react";
import * as Common from "../../../public/assets/js/commons";
import * as IF from "../../utils/interfaces";
import * as FetchChatSession from "../../utils/fetchs/fetchChatSession";
import { Link } from "react-router-dom";


declare var gsap: any | undefined; // GSAP 코어 객체

export default function ChatPrompterFooter ( ) {

  const [ chatSessions, setChatSessions ] = useState<IF.IDataChatSession[]>([]);

  useEffect( () => {

    FetchChatSession.findSessions("public", 1, 10, datas => {
      setChatSessions( ! datas ? [] : datas );
    });
    
  }, [] );


  return (<>
    <div className="chat-prompter-footer" >

      <div className="chat-prompter-footer-inner">

        <div className="chat-prompter-footer-content menu-container">

          <hgroup className="menu-container-headline">
            <h2 className="mb-0" itemProp="headline" aria-label="실시간 대화 세션">
              <i className="fa-solid fa-thumbs-up"></i>실시간 대화 세션
            </h2>
          </hgroup>

          <nav className="menu-wrap chat-session-menu-wrap" itemScope itemType="https://schema.org/Navigation">
            <ul className="menu menu-list list-unstyled chat-session-menu entry-card-list" role="menu" itemScope itemType="https://schema.org/ItemList">
              {/* 아이템 생성 */}
              { chatSessions.map( (cs, csi) => {
                  return (
                    <li key={csi} className="menu-item d-flex align-items-center" itemScope itemType="https://schema.org/ListItem" data-count={csi + 1}>
                      <Link to={`/c?sid=${cs.id}`} className="a-wrap entry-card-wrap">

                      <article className="entry-card type-chat-session status-publish format-standard has-post-thumbnail hentry">
                        <figure className="entry-card-thumb card-thumb no-image">
                          
                          { cs.member.meta && cs.member.meta.find(meta => meta.meta_key === "picture") && <img src={cs.member.meta.find(meta => meta.meta_key === "picture")?.meta_value} className="entry-card-thumb-image card-thumb-image wp-post-image" alt=" Party 2025～パロマを飲んでお祝いしよう！～を開催します" decoding="async" loading="lazy" /> }
                        
                          { ( ! cs.member.meta || ! cs.member.meta.find(meta => meta.meta_key === "picture1111") ) ?? <i className="fa-solid fa-circle-user"></i> } 

                        </figure> 
                        <div className="entry-card-content card-content">
                          <div className="d-flex align-items-start justify-content-between">
                            <div>
                              <h2 className="entry-card-title card-title mb-0" itemProp="headline">
                                { cs.lastQuestion ?? "빈 대화 세션입니다." }
                              </h2>
                              <div className="entry-card-excerpt">
                                <p className="mb-0">{ cs.member && cs.member.email }</p>
                              </div>
                            </div>
                            <div className="entry-card-meta bottom">
                              <div className="entry-card-info">
                                <div className="post-date">
                                  <i className="fa-regular fa-clock me-1"></i>
                                  <span className="entry-date">2025/03/28</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>

                      </Link>
                    </li>);
                } )
              } 
            </ul>
          </nav>

          <div className="row justify-content-end">
            <Link to="" className="btn btn-outline-primary w-auto">
              <i className="fa-solid fa-list me-2"></i>
              <span>더 보기</span>
            </Link>
          </div>

        </div>

      </div>
      
    </div>
  </>);
}