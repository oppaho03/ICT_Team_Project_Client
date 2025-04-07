/**
 * 컴포넌트 : 메뉴 - 헤더
 */

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function MenuHeaderPrimary () {

  const navigate = useNavigate();
  const location = useLocation();

  const goBack = ( e: React.MouseEvent<HTMLAnchorElement> ) => {
    e.preventDefault();
    navigate(-1);
  }


  return ( <> 
    <div className="nav-wrap d-flex flex-row justify-content-end justify-content-lg-between w-100">
      
      {/* 메뉴 : 헤더 기본 메뉴 */}
      <nav className="nav nav-menu nav-menu-left" itemScope itemType="https://schema.org/SiteNavigationElement" role="navigation"> 
        <ul className="list-unstyled mb-0 menu menu-header d-flex flex-nowrap align-items-center" id="menu-header-primary">
          <li className="menu-item menu-item-home menu-item-type-custom" data-label="">
            <Link to="/" className="link link-hasicon link-unstyle" title="Home" itemProp="url" itemScope itemType="https://schema.org/WebPage" onClick={goBack}> {/* rel="noopener noreferrer" */}
              <i className="im im-ict icon-chevron-left"></i>
            </Link>
          </li>
        </ul>
      </nav>

      {/* 메뉴 : 헤더 확장 메뉴  */}
      <nav className="nav nav-menu nav-menu-right" itemScope itemType="https://schema.org/SiteNavigationElement" role="navigation"> 
        <ul className="list-unstyled mb-0 menu menu-header menu-header-options d-flex flex-nowrap align-items-center">
          { ! window.isLoggedIn() && 
            <React.Fragment>
            <li className="menu-item menu-item-type-custom" data-label="">
              <Link to={`/signup`} className="link link-hasicon link-unstyle" title="Sign Up" itemProp="url" itemScope itemType="https://schema.org/WebPage"> {/* rel="noopener noreferrer" */}
                <i className="fa-solid fa-user-plus"></i>
                <span>회원가입</span>
              </Link>
            </li> <li className="menu-item menu-item-type-custom" data-label="">
              <Link to={`/signin`} className="link link-hasicon link-unstyle" title="Sign In" itemProp="url" itemScope itemType="https://schema.org/WebPage"> {/* rel="noopener noreferrer" */}
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <span>로그인</span>
              </Link> 
            </li>
            </React.Fragment>
          }

          { window.isLoggedIn() &&
            <React.Fragment>
              <li className="menu-item menu-item-type-custom" data-label="">
                <Link to={`/logout`} className="link link-hasicon link-unstyle" title="Sign In" itemProp="url" itemScope itemType="https://schema.org/WebPage"> {/* rel="noopener noreferrer" */}
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>로그아웃</span>
                </Link> 
              </li>
            </React.Fragment>
          }
        </ul>
      </nav>
    </div>
  </>);
}