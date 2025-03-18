/**
 * 컴포넌트 : 헤더 영역  
 */
import DrawableMenuToggle from "../button/DrawableMenuToggle";

export default function Header() {
  return (<>
    <div className="app-header-wrap">
      <div className="app-header-outer">
        <header className="app-header" id="apphead" role="banner">
          
          <div className="d-flex align-items-center">
            
            {/* .app-header-inner */}
            <div className="app-header-inner flex-grow-0 flex-shrink-0">
              <div className="app-header-drawable-menu-toggle">
                {/* UI - 버튼 : 서랍 메뉴 토글 버튼 */}
                <DrawableMenuToggle />
              </div> 
            </div>
            
            {/* .app-header-inner */}
            <div className="app-header-inner flex-grow-1 flex-shrink-1 d-flex">
              <div className="container-fluid d-flex justify-content-between align-items-center"> 
                  HEADER
              </div>
            </div>

          </div> {/* wrap */}

        </header> {/* #apphead */}
      </div> 
    </div>
  </>);
};