
/**
 * UI - 버튼 : SNS 로그인 - 구글
 */

type Props = {
  onClick: (e:any) => void;
};


export default function LoginSNSGoogle({onClick}:Props) {
  //: 아래 코드를 JJS가 넣긴 했는데 아래 이 코드가 필요할까??
 /*  const [params] = useSearchParams();
  
  //(TODO): 이 코드는 나중에 [.env]파일 환경변수를 사용한 코드로 변경하자.
  // YMY 클라이언트 아이디
  // const GOOGLE_CLIENT_ID = '768424863727-grm75230upjmldp7ckhvhk37ue6ef5ce.apps.googleusercontent.com';
  // JJS 클라이언트 아이디
  const GOOGLE_CLIENT_ID = '306262834789-rf0m4of6ha694bdsm254etc3h6q18o03.apps.googleusercontent.com';
  
  // Google OAuth2로그인 요청시 필요한 scope파라미터를 다루는거다.
  // Oauth2에서는 scope를 통해 어떤 정보에 접근할 권한을 요청할지 명시한다.
  const GOOGLE_SCOPE = encodeURIComponent('openid email profile');

  // YMY 리다이렉트 URI
  // const GOOGLE_REDIRECT_URI = 'https://indirectly-crack-macaque.ngrok-free.app/auth/social/login/google/';
  // JJS 리다이렉트 URI
  const GOOGLE_REDIRECT_URI = 'https://noted-enjoyed-llama.ngrok-free.app/signin/';

  const REDIRECT_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=code&scope=${GOOGLE_SCOPE}&access_type=offline`;


  const handleLogin = () => {
    //구글로그인 버튼을 클릭하면 구글로그인 페이지로 이동
    //REDIRECT_URI로 인해서 REDIRECT_URI에 code=XXX값이 붙는다.
    window.location.href = REDIRECT_URI;
  };

  useEffect(() => {
    //params.get('code')는 URL에서 code=XXX값을 꺼낸다.
    const code = params.get('code');
    if (code) {
      // 받은 code가 있다면 이걸 아래 백엔드URI POST로 보낸다.
      // 백엔드는 아마 이 code를가지고 Google에 access_token 요청하고, 사용자 정보를 받아서 로그인 처리를 해준다.
      axios.post('https://noted-enjoyed-llama.ngrok-free.app/auth/social/login/google/',
        { code: code },
        { headers: {'Content-Type': 'application/json'} })
        //서버에서 JWT같은 토큰을 응답하면(res.data에 담겨있다) 이걸 localStorage등에 저장하면 로그인 유지가 가능하다.
        //이후 인증이 필요한 API호출에 이 토큰을 헤더에 실어 보내면 된다.
        .then((res : any) => {
          console.log('로그인 성공!', res.data);
          localStorage.setItem('access', res.data.access);
          localStorage.setItem('refresh', res.data.refresh);
        }).catch(err => {
          console.error('서버 에러:', err);
        });
    }
  }, []); */

  return (<>
    <button type="button" onClick={onClick} className="btn btn-has-icon btn-login sns-login sns-login-google" value="google">
      <div className="ic ic-logo">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ 'display': 'block' }}>
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