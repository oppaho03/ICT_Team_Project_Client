import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleAuth = () => {
  const handleSuccess = (response: any) => {
    console.log("Google 로그인 성공:", response);
    alert("Google 로그인 성공!");
  };

  const handleFailure = () => {
    console.error("Google 로그인 실패");
    alert("Google 로그인에 실패했습니다.");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
