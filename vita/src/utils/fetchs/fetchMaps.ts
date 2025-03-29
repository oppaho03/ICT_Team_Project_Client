/**
 * 데이터 통신 (Fetch:Axios) : 맵 API
 */
import axios from "axios";
// import { SERVER_URL, SERVER_FEST_API_URL, IFetchResponseDefault }from  "./all";

const API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

export function addScript( callback: (()=>void) | null = null ): HTMLScriptElement {

  const id = "maps-script";

  let script = document.getElementById (id) as HTMLScriptElement|null;

  if ( ! script ) {
    script = document.createElement("script") ;
    script.id = id; // ID 설정
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&libraries=services`; // 추가할 스크립트 URL (&callback=initMap)
    script.async = true;
    script.defer = true;

    if ( callback ) script.onload = callback;

    document.body.appendChild(script);
  }

  return script;
}


