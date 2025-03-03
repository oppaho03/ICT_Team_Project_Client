import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import DrawableMenu from "../common/DrawableMenu";
import Footer from "../common/Footer";

/**
 * 레이아웃 : 기본 페이지
 */
export default function PageLayout () {
  return (<>
    <div className="lyt-grid root">
      
      <div className="lyt-grid-item" role="section" >
        { /* Header 영역 */ }
        <Header />
        { /* Main 영역 */ }
        <div className="app-content-wrap flex-grow-1 flex-shrink-1">
          <main className="app-content" id="content" role="main"><Outlet /></main>
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