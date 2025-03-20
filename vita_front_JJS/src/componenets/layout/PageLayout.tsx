import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import DrawableMenu from "../common/DrawableMenu2";
import Footer from "../common/Footer";
import "../../App.css"


/**
 * 레이아웃 : 기본 페이지
 */
export default function PageLayout () {
  return (
	<>
		<DrawableMenu />
		<div className = "content">
			<Header />
			<Outlet />
			<Footer />
		</div>
  	</>
	);
}