/**
 * 컴포넌트 : 채팅 프롬프트 
 */
// import shortid from 'shortid';

import { useSelector } from "react-redux";
import ChatPrompterForm from "./ChatPrompterForm";
import ChatPrompterHeader from "./ChatPrompterHeader";

export default function ChatPrompter ( ) {

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
          <ChatPrompterForm /> {/* 컴포넌트 : 채팅 프롬프트 폼 */}
        </div>

        <div className="chat-prompter-inner">
        </div>

      </div>
    </div>
  </>);
}