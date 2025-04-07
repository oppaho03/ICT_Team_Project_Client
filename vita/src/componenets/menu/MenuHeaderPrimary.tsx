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
      {/* <nav className="nav nav-menu nav-menu-right" itemScope itemType="https://schema.org/SiteNavigationElement" role="navigation"> 
        <ul className="list-unstyled mb-0 menu menu-primary d-flex flex-nowrap align-items-center">
          <li className="menu-item menu-item-type-custom" data-label="">MENU ITEM1</li>
          <li className="menu-item menu-item-type-custom" data-label="">MENU ITEM2</li>
        </ul>
      </nav> */}
    </div>
  </>);
}