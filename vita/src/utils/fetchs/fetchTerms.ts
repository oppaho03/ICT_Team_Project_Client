/**
 * 데이터 통신 (Fetch:Axios) : 용어 및 카테고린ㄴ
 */
import axios from "axios";
import { SERVER_URL, SERVER_FEST_API_URL, IFetchResponseDefault, getHeaders }from  "./all";
import { IDataCategory, IResponseEntity } from "../interfaces";


/**  
 * 용어(및 카테고리) 불러오기 
 * @param { string } taxonomy - 카테고리 슬러그 
 * @param { function } callback
 * @return
 */
export async function findAll ( taxonomy: string, callback: null | ( (datas:any|null )=> any ) ) {

  let respData;

  try {
    const uri = `${SERVER_URL}/api/terms/category/${taxonomy}?test=1`;

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

/**
 * 용어(및 카테고리) 'slug' 로 검색
 * @param {string} slug 
 * @param {string} taxonomy 
 * @param {function} callback 
 */
export async function findBySlug ( slug: string, taxonomy: string, callback: null | ( (datas:IDataCategory|null )=> any ) ) {

  let respData;

  try {
    const uri = `${SERVER_URL}/api/terms/s?slug=${slug}&category=${taxonomy}`;

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


/**
 * 부모(루트)의 하위 용어(및 카테고리) 검색
 * @param {number} id 
 * @param {function} callback 
 */
export async function findByParentId ( id: number , callback: null | ( (datas:IDataCategory[]|null )=> any ) ) {

  let respData;

  try {
    const uri = `${SERVER_URL}/api/terms/s?parent=${id}`;

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



