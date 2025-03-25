/**
 * 데이터 통신 (Fetch:Axios)
 * 
 */

/* 인터페이스: 통신 기본 응답 
*/
export interface IFetchResponseDefault {
  config: any,
  headers: any,
  data: any,
  status: number,
  statusText: string
}

export const SERVER_URL = (import.meta.env.VITE_SERVER_SSL == "0" ? "http://" : "https://" ) + import.meta.env.VITE_SERVER_HOST + ":" + import.meta.env.VITE_SERVER_PORT;

export const SERVER_FEST_API_URL = (import.meta.env.VITE_SERVER_FEST_API_SSL == "0" ? "http://" : "https://" ) + import.meta.env.VITE_SERVER_FEST_API_HOST + ":" + import.meta.env.VITE_SERVER_FEST_API_PORT;
