/**
 * 데이터 통신 (Fetch:Axios) : 용어 및 카테고린ㄴ
 */
import axios from "axios";
import { SERVER_URL, SERVER_FEST_API_URL, IFetchResponseDefault }from  "./all";
import { IResponseEntity } from "../interfaces";


/**  
 * 용어(및 카테고리) 불러오기 
 * @param { string } taxonomy - 카테고리 슬러그 
 * @param { function } callback
 * @return
 */
export async function findAll ( taxonomy: string, callback: null | ( (datas:any|null )=> any ) ) {

  let respData;

  try {
    const uri = `${SERVER_URL}/api/terms/category/${taxonomy}`;
    const result = await axios.get<IFetchResponseDefault>( uri, {}); 
    console.log(result);
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


