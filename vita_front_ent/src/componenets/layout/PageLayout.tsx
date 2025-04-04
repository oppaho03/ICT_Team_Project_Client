import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import DrawableMenu from "../common/DrawableMenu";
import Footer from "../common/Footer";
import ChatPrompter from "../chat/ChatPrompter";
import BodyClass from "../../utils/bodyClass";

/**
 * 레이아웃 : 기본 페이지
 */
export default function PageLayout () {
  return (<>
    <BodyClass />
    <div className="lyt-grid root">
      <div className="lyt-grid-item d-flex flex-column" role="section" >
        { /* Header 영역 */ }
        <Header />
        { /* Main 영역 */ }
        <div className="app-content-wrap flex-grow-1 flex-shrink-1">
          <main className="app-content" id="content" role="main">
            <div className="app-content-inner">
              <Outlet />
            </div>
            <ChatPrompter />
          </main>
        </div>
        { /* Footer 영역 */ }
        <Footer />
      </div> { /* lyt-grid-item */ }
      
      <div className="lyt-grid-item" role="section">
        { /* DrawableMenu 영역 */ }
        <DrawableMenu />
      </div> { /* lyt-grid-item */ }

    </div> {/* lyt-grid root */}
  </>);
}

 
