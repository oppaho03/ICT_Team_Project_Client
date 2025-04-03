/**
 * 데이터 통신 (Fetch:Axios) : 로그인
 */
import axios from "axios";
import { SERVER_URL, SERVER_FEST_API_URL, IFetchResponseDefault }from  "./all";
import { getHeaders }from  "./all";
import { IResponseEntity,  } from "../interfaces";

/**  
 * 로그인 : 다이렉트
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


/**
 * 인증 코드 -> 인증 토큰으로 변경
 * @param { string } provider - google | kakao | naver 
 * @param { string } authcode - 인증 코드 
 * @param { function } callback
 */
export async function setAuthToken ( provider: string,  authcode: string, callback: null | ( (datas:any|null )=> any ) ) {

  let respData = null;
  
  try {

    if ( callback ) callback( respData );  
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


export async function onLoginGoogle ( authcode: string, callback: null | ( (datas:any|null )=> any ) ) {

}


