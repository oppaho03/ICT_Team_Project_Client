/**
 * 비밀번호 찾기 페이지
 */
import { FunctionComponent } from 'react';
import styles from './FindPassword.module.css';



const FindPassword:FunctionComponent = () => {
  	return (
    		<div className={styles.findpassword}>
      			<div className={styles.findpassword1}>
        				<div className={styles.logintitle}>
          					<img className={styles.vitaLogoMIcon} alt="vita logo" src="/assets/images/vita-logo-m.svg" />
          					<div className={styles.aiParent}>
            						<div className={styles.ai}>더 건강한 삶을 위한 AI</div>
            						<div className={styles.div}>건강을 위한 스마트 케어</div>
          					</div>
        				</div>
        				<div className={styles.div1}>비밀번호 찾기</div>
        				<div className={styles.inputbox}>
          					<div className={styles.div2}>이메일</div>
          					<div className={styles.div3}>최소 8자 이상, 대문자와 소문자, 숫자 및 특수 문자 포함</div>
          					<div className={styles.inbox}>
            						<div className={styles.exPassword}>ex:) PasswOrd!</div>
          					</div>
        				</div>
        				<div className={styles.button}>
          					<div className={styles.div4}>{`다음단계로 `}</div>
        				</div>
        				<div className={styles.loginFind}>
          					<div className={styles.div4}>회원가입</div>
          					<div className={styles.div4}>|</div>
          					<div className={styles.div4}>아이디 찾기</div>
        				</div>
      			</div>
    		</div>);
};

export default FindPassword;

