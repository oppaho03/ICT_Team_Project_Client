/**
 * 데이터 통신 (Fetch:Axios) : 맵 API
 */
import axios from "axios";
// import { SERVER_URL, SERVER_FEST_API_URL, IFetchResponseDefault }from  "./all";

// 인터페이스 : 주소 아이템
interface IAddressItem {
  address_name: string,
  address_type: string,
  road_address: {
    address_name: string, 
    building_name: string,
    main_building_no: string,
    region_1depth_name: string,
    region_2depth_name: string,
    region_3depth_name: string,
    road_name: string,
    sub_building_no: string,
    underground_yn: string,
    x: string,
    y: string,
    zone_no: string
  }, 
  x: string,
  y: string
};

// 인터페이스 : 장소 아이템
interface IPlaceItem {
  address_name: string, 
  category_group_code: string, 
  category_group_name: string, 
  category_name: string, 
  distance: string, 
  id: string, 
  phone: string, 
  place_name: string, 
  place_url: string, 
  road_address_name: string, 
  x: string, // lng
  y: string, // lat

}

const API_KEY = import.meta.env.VITE_KAKAO_API_KEY;


/**
 * API 스크립트 로드
 * @param {function} callback 
 * @returns 
 */
export function addScript( callback: (()=>void) | null = null ): HTMLScriptElement {

  const id = "maps-script";

  let script = document.getElementById (id) as HTMLScriptElement|null;

  if ( ! script ) {
    script = document.createElement("script") ;
    script.id = id; // ID 설정
    script.type= "text/javascript"
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&libraries=services,clusterer`; // 추가할 스크립트 URL (&callback=initMap)
    // script.async = true;
    // script.defer = true;
    // script.crossOrigin="anonymous"

    if ( callback ) script.onload = callback;
  
    document.body.appendChild(script);
  }
  else if (callback ) callback();

  return script;
}



/**
 * 주소 값 -> 좌표 변환
 * @param {string} address 
 * @param {function} callback 
 */

export function getLatLngByAddress( address: string, callback: null | ( (datas:IAddressItem[] )=> any ) ): void {
  const kakao = window.kakao;
  try {
    if ( ! kakao )
      throw new Error(" kakao 객체를 읽어올 수 없습니다. ");

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch( address, ( results:IAddressItem[] | null , status: any ) => {
      const address = [];
      if ( status == 'OK' && results ) address.push( ...results );
      if ( callback ) callback( address );
    } );

  }
  catch( err ) {
    console.log(err);
    if ( callback ) callback( [] );
  }
}

/**
 * 좌표 값 반환
 * @param {number} lat 
 * @param {number} lng 
 * @returns 
 */
export function setPosition ( lat: number, lng: number ): any {
  const kakao = window.kakao;

  let pos; 
  try {
    if ( ! kakao ) throw new Error(" kakao 객체를 읽어올 수 없습니다. ");
    pos  = new kakao.maps.LatLng(lat, lng); 
  }
  catch( err ) {
    console.log(err);
    pos = null;
  }

  return pos;

} 

/**
 * 맵 : 마커 생성
 * @param {object} pos 
 * @returns 
 */
export function setMarker ( pos:object ): any {
  const kakao = window.kakao;
  let marker;
  try {
    if ( ! kakao )
      throw new Error(" kakao 객체를 읽어올 수 없습니다. ");

    marker = new kakao.maps.Marker({
      position: pos,
      clickable: true
      //draggable:true
    });

  }
  catch( err ) {
    console.log(err);
    marker = null;
  }
  
  return marker;
}


/**
 * 장소 검색
 * @param {string} q  
 * @param {any} options - { location, radius } 
 * @param {function} callback 
 */
export function findPlaces ( q: string, options: any, callback: null | ( ( datas:IPlaceItem[] | null )=> any ) ): void {

  const kakao = window.kakao;
  
  try {
    if ( ! kakao )
      throw new Error(" kakao 객체를 읽어올 수 없습니다. ");

    const places = new kakao.maps.services.Places();

    places.keywordSearch(q, ( datas: IPlaceItem[] | null, status: any ) => {
      if ( status != 'OK' || ! datas ) datas = [];
      if ( callback ) callback(datas );
    }, options);

  }
  catch( err ) {
    console.log(err);
   
  }
} 