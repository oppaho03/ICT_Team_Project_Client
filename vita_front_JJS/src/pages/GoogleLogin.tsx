import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import axios from "axios";

const GoogleAuth = () => {
  const [user, setUser] = useState<any>(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        setUser(userInfo.data);
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
      }
    },
    onError: (error) => console.error("로그인 실패:", error),
  });

  const logout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <h3>환영합니다, {user.name}!</h3>
          <img src={user.picture} alt="Profile" width={50} />
          <p>Email: {user.email}</p>
          <button onClick={logout}>로그아웃</button>
        </div>
      ) : (
        <button onClick={() => login()}>Google 로그인</button>
      )}
    </div>
  );
};

export default GoogleAuth;
