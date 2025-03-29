/**
 * 데이터 통신 (Fetch:Axios)
 * 
 */
import * as Commons from "../../../public/assets/js/commons";

/* 인터페이스: 통신 기본 응답 
*/
export interface IFetchResponseDefault {
  config: any,
  headers: any,
  data: any,
  status: number,
  statusText: string
}

export const SERVER_URL = (import.meta.env.VITE_SERVER_SSL == "0" ? "http://" : "https://" ) + import.meta.env.VITE_SERVER_HOST + ( import.meta.env.VITE_SERVER_PORT ? ":" + import.meta.env.VITE_SERVER_PORT : "" );

export const SERVER_FEST_API_URL = (import.meta.env.VITE_SERVER_FEST_API_SSL == "0" ? "http://" : "https://" ) + import.meta.env.VITE_SERVER_FEST_API_HOST + ( import.meta.env.VITE_SERVER_FEST_API_PORT ? ":" + import.meta.env.VITE_SERVER_FEST_API_PORT : "" );

/**
 * 헤더 값 불러오기 
 * @return { any } 
 */
export function getHeaders( header: any = {} ): any {

  /* 
  Content-Ttype:
    - application/json : JSON 데이터
    - application/x-www-form-urlencoded : 폼 데이터
    - multipart/form-data : 파일 업로드 
    - text/plain : 일반 텍스트
    - application/xml : XML 데이터
  */

  const headerDefaultValue: any = {
    "Content-Type": "application/json", 
    "Authorization": null
  };
  
  const token = Commons.getSessionStorage("token");
  if ( token ) headerDefaultValue['Authorization'] = `Bearer ${token}`;

  return { ...headerDefaultValue, ...header };
}