/**
 * 데이터 통신 (Fetch:Axios) : 채팅 세션 
 */
import axios from "axios";
import { SERVER_URL, SERVER_FEST_API_URL, IFetchResponseDefault, getHeaders }from  "./all";
import { IResponseEntity, IDataExtraKeywords,  IDataChatSession, IDataChatQnA } from "../interfaces";


/**  
 * 문장 -> 키워드 추출 
 * @param { string } text 
 * @param { function } callback
 * @return
 */
export async function extrKeywords ( text: string, callback: null | ( (datas:any|null )=> any ) ) {

  let respData;

  try {
    
    const uri = `${SERVER_FEST_API_URL}/keyword_parser`;

    const headers = getHeaders();
    const reqData = { text };

    const result = await axios.post<any>( uri, reqData, { headers }); 

    // 서버 응답 데이터 : IDataExtraKeywords
    const resultData = result.data ? result.data as unknown as IDataExtraKeywords : null;

    // 서버 응답 데이터 - 오류 처리
    if ( ! result || ! resultData ) {
      throw new Error( result.statusText );
    }
    
    // 서버 응답 데이터 
    respData = resultData;  
  }
  catch ( err: any ) {
    console.log(err);

    respData = {
      original_text: text, 
      processed_text: text, 
      keywords: text.split(/\s+/).filter( word => word.length > 1 )
    };
    
    if ( err.message ) console.log(err.message);
    // else console.log(err);
  }
  finally {
    if ( callback ) callback( respData );  
  }
}


/**
 * 채팅 세션 리스트 불러오기 
 * @param p 
 * @param ol 
 * @param callback 
 */
export async function findSessions ( p: number, ol: number, callback: null | ( (datas:Array<IDataChatSession>|null )=> any ) ) {
  let respData;
  
  try {
    
    const uri = `${SERVER_URL}/api/sessions/me`;

    const headers = getHeaders();
    const reqData = { p, ol };

    const result = await axios.get<IFetchResponseDefault>( uri, { headers, params: reqData }); 

    // 서버 응답 데이터 : IResponseEntity
    const resultData = result.data ? result.data as unknown as IResponseEntity : null;
    
    // 서버 응답 데이터 - 오류 처리
    // if ( ! result || result.status != 200 || ! resultData || ( resultData.success && resultData.success != 1 ) ) {
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


export async function findSessionQnA ( sid: number, callback: null | ( (datas:Array<IDataChatQnA>|null )=> any ) ) {
  let respData;

  try {
    
    const uri = `${SERVER_URL}/api/qna`;

    const headers = getHeaders();
    const reqData = { sid };
  
    const result = await axios.get<IFetchResponseDefault>( uri, { headers, params: reqData }); 


    // 서버 응답 데이터 : IResponseEntity
    const resultData = result.data ? result.data as unknown as IResponseEntity : null;
    
    // 서버 응답 데이터 - 오류 처리
    // if ( ! result || result.status != 200 || ! resultData || ( resultData.success && resultData.success != 1 ) ) {
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
 * 답변 검색 
 * - 질문과 세션 생성
 * @param { number } sid
 * @param { string } contents
 * @param { string[] } keywords 
 * @param { function } callback
 * @return
 */
export async function findAnswer ( sid: number | null, contents: string, keywords: string[], callback: null | ( (datas:any|null )=> any ) ) {

  let respData;

  try {
    
    const uri = `${SERVER_URL}/api/chatquestions`;

    const headers = getHeaders();
    const reqData = { sid, contents, keywords };
    if ( ! sid  ) reqData.sid = null;

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



