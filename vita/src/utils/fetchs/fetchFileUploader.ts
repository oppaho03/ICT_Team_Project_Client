/**
 * 데이터 통신 (Fetch:Axios) : 파일 업로더 
 */
import axios from "axios";
import { SERVER_URL, SERVER_FEST_API_URL, IFetchResponseDefault, getHeaders }from  "./all";
import { IResponseEntity, IDataExtraKeywords,  IDataPost } from "../interfaces";

/**
 * 파일 업로드 
 * @param {formData} formData 
 * @param {function} callback 
 */
export async function uploadFile ( formData: FormData, callback: null | ( (datas: IDataPost|null )=> any ) ) {
  let respData;
  
  try {
    
    const uri = `${SERVER_URL}/api/files/upload`;

    const headers = getHeaders( { 'Content-Type' : 'multipart/form-data' } );
    const result = await axios.post<IFetchResponseDefault>( uri, formData, { headers }); 

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
 * 문장 -> 키워드 추출 
 * @param { string } text 
 * @param { function } callback
 * @return
 */
export async function uploadFileToOCR ( files: FileList, callback: null | ( (datas:any|null )=> any ) ) {

  let respData;

  try {
    
    // const uri = `${SERVER_FEST_API_URL}/ocr/analyze`;
    const uri = `${SERVER_FEST_API_URL}/ocr/analyze_with_keywords`;

    const headers = getHeaders( { 'Content-Type' : 'multipart/form-data' } );
    // const reqData = { text };

    /* 폼 데이터 생성
    */ 
    const formData = new FormData();
    formData.append("file", files[0]);
    const result = await axios.post<any>( uri, formData, { headers });  

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

    if ( err.message ) console.log(err.message);
    // else console.log(err);
  }
  finally {
    if ( callback ) callback( respData );  
  }
}