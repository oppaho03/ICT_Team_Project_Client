/**
 * 데이터 통신 (Fetch:Axios) : 로그인
 */
import axios from "axios";
import { SERVER_URL, SERVER_DJANGO_API_URL, IFetchResponseDefault }from  "./all";
import { getHeaders }from  "./all";
import { IResponseEntity, IDataOAuthTokenPayload, IDataMemberWithSNS } from "../interfaces";

/**
 * 인증 코드 -> 인증 토큰 및 프로필 정보 반환
 * @param { string } provider - google | kakao | naver 
 * @param { string } code - 인증 코드 
 * @param { function } callback
 */
export async function setAuthToken ( provider: string,  code: string, callback: null | ( (datas:IDataOAuthTokenPayload|null )=> any ) ) {

  let respData = null;
  
  try {

    let uri = "";

    if ( provider == "google" ) 
      uri = `${SERVER_DJANGO_API_URL}/auth/social/login/google/`;
    else if ( provider == "kakao" ) 
      uri = `${SERVER_DJANGO_API_URL}/auth/social/login/kakao/`;

    if ( uri == "" ) 
      throw new Error( `유효하지 않은 인증 업체(Provider) 타입 입니다. : ${provider}` );

    const headers = getHeaders();

    const reqData = { 
      code: code, 
      redirect_url: import.meta.env.VITE_OAUTH2_REDIRECT_URL
    };

    
    const result = await axios.post<IFetchResponseDefault>( uri, reqData, { headers }); 
    
    // 서버 응답 데이터 : IResponseEntity
    const resultData = result.data ? result.data as unknown as IResponseEntity : null;

    // 서버 응답 데이터 - 오류 처리
    if ( ! result || ! resultData || ! resultData.response ) {
      console.log( resultData );
      throw new Error( "인증 토큰을 발급 받을 수 없습니다." );
    }
    
    // 서버 응답 데이터 
    respData = resultData.response ? resultData.response as IDataOAuthTokenPayload : null;
  }
  catch ( err: any ) {
    console.log(err);
    if ( err.message ) console.log(err.message);
    // else console.log(err);
    respData = null;
  }
  finally {
    if ( callback ) callback( respData );  
  }
}

// *필수값: provider_id, provider, email(로그인하려는 이메일 주소), access_token(SNS 인증 토큰값) ,
// *옵션값: name, picture

interface IDataSignInByOAuthToken {
  provider_id: string,
  provider: string,
  email: string,
  access_token: string,
  picture?: string,
  name?: string,
}
/**
 * 로그인 : 인증 토큰을 사용한 로그인
 * @param reqData 
 * @param callback 
 */
export async function onSignInByOAuthToken ( dataset: IDataSignInByOAuthToken,  callback: null | ( (datas: IDataMemberWithSNS |null )=> any ) ) {
  let respData;

  try {
    
    const uri = `${SERVER_URL}/api/sns/login`;

    const headers = getHeaders();
    const result = await axios.post<IFetchResponseDefault>( uri, dataset, { headers }); 

    // 서버 응답 데이터 : IResponseEntity
    const resultData = result.data ? result.data as unknown as IResponseEntity : null;
    
    // 서버 응답 데이터 - 오류 처리
    if ( ! result || ! resultData || ( resultData.success && resultData.success != 1 ) ) {
      let messages = resultData && resultData.response ? ( resultData.response.messages ? resultData.response.messages : resultData.response.data ) : null;

      if ( ! messages ) console.log(result); // 디버그용 콘솔
      throw new Error( messages ? messages : result.statusText );
    }
    
    // 서버 응답 데이터 
    const resp = resultData.response ? resultData.response : null;
    respData = resp?.data ? resp.data : null;    
  }
  catch ( err: any ) {
    console.log(err);

    respData = null;
    if ( err.message ) console.log(err.message);
    // else console.log(err);
  }
  finally {
    if ( callback ) callback( respData );  
  }

}

/**  
 * 로그인 : 다이렉트 로그인
 * - 질문과 세션 생성
 * @param { string } email
 * @param { string } password
 * @param { function } callback
 * @return
 */
export async function onSignIn ( email: string, password: string, callback: null | ( (datas:any|null )=> any ) ) {

  let respData;

  try {
    
    const uri = `${SERVER_URL}/api/login`;

    const headers = getHeaders();
    const reqData = { email, password };

    const result = await axios.post<IFetchResponseDefault>( uri, reqData, { headers }); 


    // 서버 응답 데이터 : IResponseEntity
    const resultData = result.data ? result.data as unknown as IResponseEntity : null;
    
    // 서버 응답 데이터 - 오류 처리
    if ( ! result || ! resultData || ( resultData.success && resultData.success != 1 ) ) {
      let messages = resultData && resultData.response ? ( resultData.response.messages ? resultData.response.messages : resultData.response.data ) : null;

      if ( ! messages ) console.log(result); // 디버그용 콘솔
      throw new Error( messages ? messages : result.statusText );
    }
    
    // 서버 응답 데이터 
    const resp = resultData.response ? resultData.response : null;
    respData = resp?.data ? resp.data : null;    
  }
  catch ( err: any ) {
    console.log(err);

    respData = null;
    if ( err.message ) console.log(err.message);
    // else console.log(err);
  }
  finally {
    if ( callback ) callback( respData );  
  }

}
