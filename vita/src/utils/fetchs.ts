/**
 * fetch
 */
import axios from "axios";
import { IResponseEntity } from "../interfaces";
const SERVER_URL = (import.meta.env.VITE_SERVER_SSL == "0" ? "http://" : "https://" ) + import.meta.env.VITE_SERVER_HOST + ":" + import.meta.env.VITE_SERVER_PORT;
/* 용어 및 카테고리
*/
export async function fetchAsyncTermsAllCategory ( 
  taxonomy: string, 
  callback: null | ( (datas:any|null )=> any ) ) {
  try {
    const url = SERVER_URL + "/api/terms/category/" + taxonomy;
    const options = {};
    const result = await axios.get<IResponseEntity>( url, options );
    if ( ! result || result.status != 200 || ! result.data ) throw new Error();
    // 데이터 파싱
    if ( result.data.success == 1 ) {
      const response = result.data.response;
      if ( response && response.data ) {
        if ( callback ) callback( response.data );
      } // response && response.data
    }
  }
  catch ( err: Error | any ) {
    console.log( err );
    if ( callback ) callback( null );
  }
}
/* 채팅 프롬프트 : 질문 - 답변
*/
// export async function fetchAsyncChatquestions ( content: string, keywords: string[], callback: null | ( (datas:any|null )=> any ) ) {
// };
/* 채팅 프롬프트 : 답변 검색
*/
export async function fetchAsyncChatAnswersSearch ( 
  keywords: string[], 
  callback: null | ( (datas:any|null )=> any ) ) {
  try {
    const url = SERVER_URL + "/api/answers/search";
    const datas = { keywords: keywords }
    const options = {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5TVE9SIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJzdWIiOiIxIiwiaWF0IjoxNzQxMDUxMDQ0LCJleHAiOjE3NDEwNTE5NDR9.xTVxV2BHe6qHaM8WjApKvoOnyt_LySjTk0CNRi35rEY',
        'Content-Type': 'application/json'
      }
    };
    const result = await axios.post<IResponseEntity>( url, datas, options );
    console.log(result);
    if ( ! result || result.status != 200 || ! result.data ) throw new Error();
    // 데이터 파싱
    if ( result.data.success == 1 ) {
      const response = result.data.response;
      if ( response && response.data ) {
        if ( callback ) callback( response.data );
      } // response && response.data
    }
  }
  catch ( err: Error | any ) {
    console.log( err );
    if ( callback ) callback( null );
  }
}
/*  FEST API 서버
*/
const FSERVER_URL = (import.meta.env.VITE_FSERVER_SSL == "0" ? "http://" : "https://" ) + import.meta.env.VITE_FSERVER_HOST + ":" + import.meta.env.VITE_FSERVER_PORT;
/* 채팅 프롬프트 : 문장에서 키워드 추출
 - FEST API
*/
export async function fetchAsyncExtKeywords ( 
  context: string, 
  callback: null | ( (datas:any|null )=> any ) ) {
  try {
    const url = FSERVER_URL + "/keyword_parser";
    const datas = { text: context }
    const options = { };
    const result = await axios.post<any>( url, datas, options );
    console.log(result);
    // keywords : string[]
    // original_text : string
    // processed_text : string
    if ( ! result || result.status != 200 || ! result.data ) throw new Error();
    // 데이터 파싱
    if ( result.data.success == 1 ) {
      const response = result.data.response;
      console.log(response);
      if ( response && response.data ) {
        if ( callback ) callback( response.data );
      } // response && response.data
    }
  }
  catch ( err: Error | any ) {
    console.log( err );
    if ( callback ) callback( null );
  }
}
// datas