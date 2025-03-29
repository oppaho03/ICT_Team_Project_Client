/**
 * 데이터 통신 (Fetch:Axios) : 구글 맵 API
 */
import axios from "axios";
// import { SERVER_URL, SERVER_FEST_API_URL, IFetchResponseDefault }from  "./all";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

export function addScript(): HTMLScriptElement {

  const id = "google-maps-script";

  let script = document.getElementById (id) as HTMLScriptElement|null;

  if ( ! script ) {
    script = document.createElement("script") ;
    script.id = id; // ID 설정
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initGoogleMap&libraries=places`; // 추가할 스크립트 URL (&callback=initMap)
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  return script;
}