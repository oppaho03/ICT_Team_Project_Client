/**
 * 데이터 통신 (Fetch:Axios) : 회원가입
 */
import axios from "axios";
import { SERVER_URL, SERVER_FEST_API_URL, IFetchResponseDefault }from  "./all";
import { getHeaders }from  "./all";
import { IResponseEntity, IDataMember } from "../interfaces";

/**
 * 회원가입 : 이메일 인증 코드 요청
 * @param {string} email 
 * @param {function} callback 
 */
export async function requestAuthCodeByEmail ( email: string, callback: null | ( (datas:any|null )=> any ) ) {

  let respData;

  try {
    
    const uri = `${SERVER_URL}/api/auth/temporary-registration`;

    const headers = getHeaders();
    const reqData = { email };

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
 * 회원가입 : 이메일 인증 코드 확인
 * @param {string} email 
 * @param {string} code 
 * @param {function} callback 
 */
export async function verificationAuthCodeByEmail ( email: string, code: string, callback: null | ( (datas:any|null )=> any ) ) {

  let respData;

  try {
    
    const uri = `${SERVER_URL}/api/auth`;

    const headers = getHeaders();
    const reqData = { email, code };

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


// 회원가입 : 요청
export async function onSignUp ( formData: FormData, callback: null | ( (datas:IDataMember|null )=> any ) ) {

  let respData;

  try {
    
    const uri = `${SERVER_URL}/api/members`;

    const headers = getHeaders();
    const reqData = formData;

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

