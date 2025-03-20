import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import "./DrawableMenu.css";
import smallLogo from "/src/assets/icons/VitaLogo.png";
import largeLogo from "/src/assets/icons/VitaLogo2.png";
import { NavLink } from "react-router-dom";

const menuItems = [
  { id: 1, icon: <img src="/src/assets/icons/MenuBox1.png" alt="i1"/>, label: "Dashboard", subItems: ["대시보드", "활동"] },
  { id: 2, icon: <img src="/src/assets/icons/MenuBox2.png" alt="i2"/>, label: "History", subItems: ["여기", "저기"] },
  { id: 3, icon: <img src="/src/assets/icons/MenuBox3.png" alt="i3"/>, label: "Top5", subItems: ["정신병 걸릴 것 같아요", "다리가 아파요"] },
  { id: 4, icon: <img src="/src/assets/icons/MenuBox4.png" alt="i4"/>, label: "Hot Keyword", subItems: ["불안감", "머리통증"] },

];

export default function DrawableMenu() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (id: number) => {
    setSelected(selected === id ? 0 : id);
  };

  return (
    <div
      className={`sidebar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => {
        setIsExpanded(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsExpanded(false);
        setIsHovered(false);
      }}
    >
      {/* 로고 영역 */}
      <div className="logo-container">
        <img src={isExpanded ? largeLogo : smallLogo} alt="로고" className="logo" />
      </div>

	  <div className = "menu-container search">
	  	  <div className = {`d-flex align-items-center ${isExpanded ? "search-border" : ""}`}></div>
	      <div className={`d-flex align-items-center ${isExpanded ? "border-2" : ""}`}>
	        <img src="/src/assets/icons/Search.png" alt="" />
	        {/* 검색 입력창 (isExpanded가 true일 때만 표시) */}
	        {isExpanded && (
	          <input
	            type="text"
	            className="form-control border-0 shadow-none"
	            placeholder="Search..."
	            style={{ outline: "none", background: "transparent" }}
	          />
	        )}
	      </div>
	  </div>
      {menuItems.map((item) => (
        <div key={item.id} className="menu-container">
          <div
            className={`menu-item ${selected === item.id ? "active" : ""}`}
            onClick={() => handleClick(item.id)}
          >
            <div className="icon">{item.icon}</div>
            <span className={`menu-label ${isExpanded ? "visible" : ""}`}>
              {item.label}
            </span>
            <FaChevronRight
              className={`arrow ${selected === item.id ? "rotated" : ""}`}
            />
          </div>
          <div
            className={`submenu-wrapper ${
              selected === item.id && isHovered ? "open" : ""
            }`}
          >
            <div className="submenu">
              {item.subItems.map((subItem, index) => (
                <div key={index} className="submenu-item">
                  {subItem}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className={`d-flex ${isExpanded ? "flex-row" : "flex-column"} mt-auto pb-3 gap-3`}>
        <img src = "/src/assets/icons/위치.png" alt="" />
        <img src = "/src/assets/icons/Frame 276.png" alt=""/>
        <img src = "/src/assets/icons/알림_종.png" alt=""/>
      </div>
      {/* 임시링크 */}
        <h1><NavLink to="/">HOME</NavLink></h1>
        <h1><NavLink to="/login">Login</NavLink></h1>

      <div className="user pb-4">
        <img src="/src/assets/icons/Frame 187.png" alt="" />
        <span className={`user-name ${isExpanded ? "visible" : ""}`}>
          user777
        </span>
      </div>
    </div>
  );
}