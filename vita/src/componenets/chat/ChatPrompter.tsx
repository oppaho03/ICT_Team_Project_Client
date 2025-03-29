/**
 * 컴포넌트 : 채팅 프롬프트 
 */
// import shortid from 'shortid';

import * as Commons from "../../../public/assets/js/commons";

import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatPrompterForm from "./ChatPrompterForm";
import ChatPrompterHeader from "./ChatPrompterHeader";

import { IDataCategory } from "../../utils/interfaces";

import { ChatPromptFilterContext } from "../../utils/contexts/contextChatPrompt";
import * as FecthTerms from "../../utils/fetchs/fetchTerms";

import sortBy from "sort-by"; // 정렬


export default function ChatPrompter ( ) {

  const [ dataDepartments, setDataDepartments ] = useState< Array<IDataCategory> >([]);
  const [ dataDiseases, setDataDiseases ] = useState< Array<IDataCategory> >([]);

  useEffect( () => {

    // 용어 및 카테고리 불러오기 - "진료과"
    FecthTerms.findAll( "department", ( data: Array<IDataCategory> | null ) => setDataDepartments( data ? data.sort( sortBy( "name" ) ) : [] ) );

    // 용어 및 카테고리 불러오기 - "질병"
    FecthTerms.findAll( "disease", ( data: Array<IDataCategory> | null ) => setDataDiseases( data ? data.sort( sortBy( "name" ) ) : [] ) );

    ////////////
    // Commons.setSessionStorage("token", "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwic3ViIjoiMiIsImlhdCI6MTc0Mjc4NDIzOSwiZXhwIjoxNzQyNzg1MTM5fQ.neYTm70_YGG11j5kuHkA_HKBWeY-Bird9u4JhT3xMl0");

    // const token = Commons.getSessionStorage("token");
    //Commons.removeSessionStorage("token");
  }, []);

  const prompt = useSelector( (state: any) => state.prompt );

  return (<>
    <div className="chat-prompter-wrap" >
      
      <div className={`chat-prompter${ prompt.focus ? " is-focus" : "" }${prompt.active ? " active" : ""}`} id="main-chat-prompter">

        { ! prompt.active &&
          <div className="chat-prompter-inner">
            <ChatPrompterHeader />
          </div>
        }
        
        <div className="chat-prompter-inner">
          <ChatPromptFilterContext.Provider value={ { 
            ...useContext(ChatPromptFilterContext), 
            ... { departments: dataDepartments, diseases: dataDiseases } 
            } }>
            <ChatPrompterForm /> {/* 컴포넌트 : 채팅 프롬프트 폼 */}
          </ChatPromptFilterContext.Provider>
        </div>

        <div className="chat-prompter-inner">
        </div>

      </div>
    </div>
  </>);
}