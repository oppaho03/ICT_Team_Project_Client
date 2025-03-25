
/**
 * UI - 버튼 : SNS 로그인 - 구글
 */

import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function LoginSNSGoogle() {
  const [params] = useSearchParams();

  // const GOOGLE_CLIENT_ID = '768424863727-grm75230upjmldp7ckhvhk37ue6ef5ce.apps.googleusercontent.com';
  const GOOGLE_CLIENT_ID = '638252763835-9t99mcq5ng249pqssb217ekd3hs2gpli.apps.googleusercontent.com';

  const GOOGLE_SCOPE = encodeURIComponent('openid email profile');

  // const GOOGLE_REDIRECT_URI = 'https://indirectly-crack-macaque.ngrok-free.app/auth/social/login/google/';
  const GOOGLE_REDIRECT_URI = 'https://mammal-many-parakeet.ngrok-free.app/login/';

  const REDIRECT_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=code&scope=${GOOGLE_SCOPE}&access_type=offline`;
  
  
  const handleLogin = () => {
    window.location.href = REDIRECT_URI;
  };
  
  // 콘솔 확인용
  /* useEffect(() => {
    console.log("🧪 REDIRECT_URI:", REDIRECT_URI);
  }, []); */

  useEffect(() => {
    const code = params.get('code');
    if (code) {
      // 이미 받은 code가 있으면 서버에 전달
      axios.post('https://indirectly-crack-macaque.ngrok-free.app/auth/social/login/google/', 
        {code: code},
        { 
          headers: { 'Content-Type': 'application/json' 

          }})
        
          .then(res => {
        console.log('로그인 성공!', res.data);
        // 로그인 성공 시 상태 저장, 이동 등
      }).catch(err => {
        console.error('서버 에러:', err);
      });
    }
  }, []);

  return (<>
    <button onClick={handleLogin} className="btn btn-has-icon btn-login sns-login sns-login-google" value="google">
      <div className="ic ic-logo">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ 'display' : 'block' }}>
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
          <path fill="none" d="M0 0h48v48H0z"></path>
        </svg>
      </div>
      <span className="contents">구글 로그인</span>
    </button>
  </>);
};