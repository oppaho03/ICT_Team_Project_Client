/**
 * 데이터 통신 (Fetch:Axios) : 글 (포스트)
 */
import axios from "axios";
import { SERVER_URL, SERVER_FEST_API_URL, IFetchResponseDefault }from  "./all";
import { getHeaders }from  "./all";
import { IResponseEntity, IDataMember, IDataPost } from "../interfaces";

/**
 * 회원가입 : 글(포스트) 작성 및 추가
 * @param {FormData} formData 
 * @param {function} callback 
 */
export async function savePost ( formData: FormData, callback: null | ( (datas:IDataPost|null )=> any ) ) {

  let respData;

  try {
    
    const uri = `${SERVER_URL}/api/posts`;

    const headers = getHeaders();

    const result = await axios.post<IFetchResponseDefault>( uri, formData, { headers }); 

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
 * 용어 및 카테고리 ID 로 글 검색
 * @param {number} cid 
 * @param {function} callback 
 */
export async function findByCategory ( cid: number, p: number = 1, ol: number = 10, callback: null | ( (datas:IDataPost[]|null )=> any ) ) {

  let respData;

  try {
    const uri = `${SERVER_URL}/api/posts?cid=${cid}&p=${p}&ol=${ol}`;

    const headers = getHeaders();
    const result = await axios.get<IFetchResponseDefault>( uri, { headers }); 
    
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

    console.log(respData);
  }
  catch ( err: any ) {
    respData = null;
    if ( err.message ) console.log(err.message);
    else console.log(err);
  }
  finally {
    if ( callback ) callback( respData );  
  }
}