import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginBox.module.css";
import GoogleAuth from "./GoogleLogin";
import axios from "axios";


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

    console.log("로그인 요청 데이터:", formData);

    try {
      const response = await axios.post<LoginResponse>(
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

      // ✅ 토큰 저장
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("로그인 실패:", error);

      if (axios.isAxiosError(error) && error.response) {
        alert(
          `로그인 실패! 서버 응답: ${
            error.response.data.message || "이메일과 비밀번호를 확인하세요."
          }`
        );
      } else {
        alert("로그인 실패! 네트워크 또는 서버 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={styles.loginbox}>
      <div className={styles.logintitleParent}>
        <div className={styles.logintitle}>
        <img className={styles.vitaLogoMIcon} alt="vita logo" src="/assets/images/vita-logo-m.svg" />
          <div className={styles.aiParent}>
            <div className={styles.ai}>더 건강한 삶을 위한 AI</div>
            <div className={styles.description}>건강을 위한 스마트 케어</div>
          </div>
        </div>
        <div className={styles.loginTitle}>로그인</div>

        <form className={styles.inputbox} onSubmit={handleSubmit}>
          <label className={styles.inputLabel}>이메일</label>
          <span className={styles.inputDescription}>
            최소 8자 이상, 대문자와 소문자, 숫자 및 특수 문자 포함
          </span>
          <input
            type="email"
            className={styles.inbox}
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요..."
            required
          />

          <label className={styles.inputLabel}>비밀번호</label>
          <span className={styles.inputDescription}>
            최소 16자 이상, 대문자와 소문자, 숫자 및 특수 문자 포함
          </span>
          <input
            type="password"
            className={styles.inbox}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해주세요..."
            required
          />

          <div className={styles.button}>
            <button type="submit" className={styles.buttonText}>{`로그인`}</button>
          </div>

          <div className={styles.loginOr}>또는</div>

          {/* ✅ Google 로그인 유지 */}
          <div className={styles.button2}>
            <GoogleAuth />
          </div>

          {/* ✅ Link 컴포넌트로 변경 */}
          <div className={styles.loginFind}>
            <Link to="/signup" className={styles.link}>회원가입</Link>
            <span className={styles.divider}>|</span>
            <Link to="/auth/find-id" className={styles.link}>아이디 찾기</Link>
            <span className={styles.divider}>|</span>
            <Link to="/auth/find-password" className={styles.link}>비밀번호 찾기</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginBox;
