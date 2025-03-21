import { useSelector, useDispatch } from "react-redux";
import { toggleRecording } from "../../store/chatPromptSlice";

/**
 * UI - 버튼 : 녹음
 */
export default function RecordToggle() {
  
  const dispatch = useDispatch();
  const prompt = useSelector( (state: any) => state.prompt ); 
  
  /* 바인드 : 클릭, 서랍 메뉴 토글
  */
  const handleToggler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const t = e.target as HTMLButtonElement ;

    console.log(t);

    t.classList.toggle( 'toggled' );
    dispatch( toggleRecording() ); // toggled expanded drawable

  };

  return (<>
    <button type="button" className="btn btn-has-icon btn-recoder btn-unstyled rounded-pill flex-grow-0 flex-shrink-0" onClick={handleToggler}>
      <i className="im icon-mic"></i>
    </button>
  </>);
};