/**
 * 페이지: 로그인
 */
import { useEffect } from "react";
import * as Commons from "../../public/assets/js/commons";

export default function Logout() {

  useEffect(() => {
    Commons.clearSessionStorage();
    window.location.replace("/");
  }, [location.search] );




  return (<> </>);
};