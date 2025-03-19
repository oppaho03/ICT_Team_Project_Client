import React, { useState } from 'react';
import styles from './LoginBox.module.css';
import axios from 'axios';
import GoogleAuth from './GoogleLogin';

//client ID
//secret ID
//



const LoginBox: React.FC = () => {
  const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  

    interface LoginResponse {
      token: string;
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      try {
        const response = await axios.post<LoginResponse>( // ✅ 여기에 <LoginResponse> 추가
          "http://localhost:8080/api/login",
          {
            email: formData.email,
            password: formData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
            },
          }
        );
    
        console.log("로그인 성공:", response.data);
        alert("로그인 성공!");
    
        // ✅ 타입이 명확해졌으므로 더 이상 {} 타입 경고 없음!
        localStorage.setItem("token", response.data.token);
      } catch (error) {
        console.error("로그인 실패:", error);
    
        if (axios.isAxiosError(error) && error.response) {
          alert(`로그인 실패! 서버 응답: ${error.response.data.message || "이메일과 비밀번호를 확인하세요."}`);
        } else {
          alert("로그인 실패! 네트워크 또는 서버 오류가 발생했습니다.");
        }
      }
    };
    
    

  return (
    <div className={styles.loginbox}>
      <div className={styles.logintitleParent}>
        <div className={styles.logintitle}>
          <img className={styles.vitalogoIcon} alt="" src="vita_logo.png" />
          <div className={styles.aiParent}>
            <div className={styles.ai}>더 건강한 삶을 위한 AI</div>
            <div className={styles.div}>건강을 위한 스마트 케어</div>
          </div>
        </div>
        <div className={styles.div1}>로그인</div>
        <form className={styles.inputbox} onSubmit={handleSubmit}>
          <div className={styles.div2}>이메일</div>
          <div className={styles.div3}>최소 8자 이상, 대문자와 소문자, 숫자 및 특수 문자 포함</div>
          <input type="email" className={styles.inbox} name="email" value={formData.email} onChange={handleChange} 
          placeholder="이메일을 입력해주세요..." required />

          <div className={styles.div2}>비밀번호</div>
          <div className={styles.div3}>최소 16자 이상, 대문자와 소문자, 숫자 및 특수 문자 포함</div>
          <input type="password" className={styles.inbox}  name="password" value={formData.password} onChange={handleChange} placeholder="비밀번호를 입력해주세요..." required />
          <div className={styles.button}>
            <button type="submit" className={styles.div6}>{`로그인`}</button>
          </div>

          <div className={styles.loginOr}>또는
          </div>
        
          <div className={styles.button2}>
            {/* 구글로그인 예제 */}
            <GoogleAuth/>
          </div>
          <div className={styles.loginFind}>
            <div className={styles.div6}>회원가입</div>
            <div className={styles.div6}>|</div>
            <div className={styles.div6}>아이디 찾기</div>
            <div className={styles.div6}>|</div>
            <div className={styles.div6}>비밀번호 찾기</div>
          </div>
        </form>
        </div>

    </div>);
};

export default LoginBox;
