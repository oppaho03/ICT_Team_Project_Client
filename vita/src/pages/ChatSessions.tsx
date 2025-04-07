/**
 * 페이지: 로그인
 */
import * as Commons from "../../public/assets/js/commons";
import * as IS from "../utils/interfaces";

import { FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { v4 as uuidv4 } from 'uuid';

import * as uiSlice from "../store/uiSlice";
import * as FetchSignIn from "../utils/fetchs/fetchSignIn";

import { Link, useLocation, useNavigate, } from "react-router-dom";
import * as FetchChatSession from "../utils/fetchs/fetchChatSession";
import ChatSessionEntry from "../componenets/entry/ChatSessionEntry";




export default function ChatSessions() {

  const UI = useSelector( (state: any) => state.ui );
  const dispatch =  useDispatch();
  
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const mode = params.get( "mode" );

  const redirectUri = import.meta.env.VITE_OAUTH2_REDIRECT_URL; // OAUTH2 - (공통)

  const [ chatSessions, setChatSessions ] = useState<IF.IDataChatSession[]>([]);

  /**
   * 로그인 : 다이렉트 로그인
   * @param e 
   */
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    
  };

  useEffect(() => {

    FetchChatSession.findSessions("public", 1, 5, datas => {
      setChatSessions( ! datas ? [] : datas );
    });
    
  }, [] );

  return (<>
    <section className="section d-flex flex-column justify-content-center align-items-center" id="chat-sessions">

      <div className="container">

        <div className="form-wrap">
          <form className="form form-type-modal form-signin" role="form" tabIndex={-1} action="" method="post" onSubmit={onSubmit}>

            <div className="form-header">
              {/* <Branding /> */}
            </div>

            <div className="form-body">
              <nav className="menu-wrap chat-session-menu-wrap" itemScope itemType="https://schema.org/Navigation">
                <ul className="menu menu-list list-unstyled chat-session-menu entry-card-list" role="menu" itemScope itemType="https://schema.org/ItemList">
                  {/* 아이템 생성 */}
                  { chatSessions.map( (cs, csi) => {
                      return (
                        <li key={csi} className="menu-item d-flex align-items-center" itemScope itemType="https://schema.org/ListItem" data-count={csi + 1}>
    
                          <ChatSessionEntry data={cs} />
                        </li>);
                    } )
                  } 
                </ul>
              </nav>
            </div>

          </form>
        </div> {/* form-wrap */}

      </div>
    </section>

  </>);
};