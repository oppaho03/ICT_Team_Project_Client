/**
 * 로그인 페이지
 */
import styles from "./Login.module.css";
import LoginBox from "../componenets/members/LoginBox";

export default function Login() {
  return (
    
  <div className={styles.loginPage}>

    {/* <h1>로그인 페이지</h1> */}
    <LoginBox/>

  </div>

  );

  

}
