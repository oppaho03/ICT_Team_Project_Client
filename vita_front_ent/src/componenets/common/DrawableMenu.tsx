/**
 * 컴포넌트 : 서랍 메뉴
 */

import { useSelector } from "react-redux";
// import nullProfile from "../../../public/assets/resources/images/null/profile.png";

export default function DrawableMenu() {

  const ui = useSelector( (state:any) => state.ui );

  return (<>
    <div className="app-drawable-menu-wrap">
      <aside className="app-drawable-menu" id="drawable-menu" aria-expanded={ui.expanded ? 'false' : 'true'}>
        <div className={`container${ ui.expanded ? " px-0" : ""}`}> 

          <div className=""></div>
          
          <nav className="app-menu" id="chat-session-menu">
            <ul className="menu menu-list list-unstyled">
              <li className="menu-item menu-item-type-icon">

                <a className="link link-has-icon link-unstyle" title="" aria-label="">
                  <i className="im icon-bubble"></i>
                  <span> 밥맛이 없어요. </span>
                </a>

              </li> <li className="menu-item menu-item-type-icon">

                <a className="link link-has-icon link-unstyle publish" title="" aria-label="">
                  <i className="im icon-bubble"></i>
                  <span> 구강암의 조기 발견은 중요한데, 그 이유는 조기에 발견될 수록 치료의 효과가 높아지기 때문입니다. </span>
                </a>

              </li> <li className="menu-item menu-item-type-icon">

                <a className="link link-has-icon link-unstyle" title="" aria-label="">
                  <i className="im icon-bubble"></i>
                  <span> 최근들어 소화가 잘 되지 않고 있는데 원인을 모르겠어요. </span>
                </a>

              </li>
            </ul>
          </nav>

          <nav className="app-menu app-menu-global" id="global-menu"></nav>

        </div>
      </aside>
    </div>
  </>);
}