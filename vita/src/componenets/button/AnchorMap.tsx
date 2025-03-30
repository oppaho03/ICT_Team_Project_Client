/**
 * 컴포넌트 : 버튼 - 맵 앵커 버튼
 */

import * as Commons from "../../../public/assets/js/commons";
import * as FetchMaps from "../../utils/fetchs/fetchMaps";

import { useSelector, useDispatch } from "react-redux";


import shortid from "shortid";
import { useEffect, useRef, useState } from "react";





/**
 * UI - 버튼 : 녹음
 */
export default function AnchorMap() {
  
  const dispatch = useDispatch();
  const UI = useSelector( (state: any) => state.ui );

  const [ map, setMap ] = useState<any>(null);
  const [ mapRange, setMapRange ] = useState<any>(null);
  const [ mapMarkers, setMarkers ] = useState<any[]>([]);
  
  const [ toggle, setToggle ]= useState<boolean>(false);
  
  const kakao = window.kakao; // 카카오 맵 객체
  const mapContainerRef = useRef<HTMLDivElement>(null);
  

  // https://apis.map.kakao.com/web/sample/drawShape/
  const initMap = ( latlng:any ) => {

    let curMap;

    if ( ! map ) {
      const objMap = new kakao.maps.Map(mapContainerRef.current, { 
        center: latlng, 
        level: 4, 
        mapTypeId:kakao.maps.MapTypeId.ROADMAP 
      });
      setMap( objMap ); // map 객체 삽입

      curMap = objMap;
    }
    else curMap = map;

    curMap.relayout();

    // 마커 : 중심 좌표 
    const marker = FetchMaps.setMarker( latlng );
    if ( marker ) {
      marker.setMap( curMap );
      setMarkers( [ ...mapMarkers, marker ] );
    }

    const radius = 2500; // 반경 (반지름) 2.5KM

    // 범위: 유효 범위 ( 약 5km )
    if ( true ) {
      const range = new kakao.maps.Circle({
        center: latlng, // 원의 중심 좌표
        radius: radius, // 반경 (미터 단위, 5km = 5000m)
        strokeWeight: 2, // 선 두께
        strokeColor: "#6EC9F7", // 선 색상 (빨강)
        strokeOpacity: 0.5, // 선 투명도
        strokeStyle: "solid", // 선 스타일
        fillColor: "#D6EBF5", // 내부 색상 (빨강)
        fillOpacity: 0.5, // 내부 투명도
      });
      range.setMap( curMap );
      setMapRange( range );
    }

    // 장소(Place) 추가 
    // "병원" 검색 
    if ( true ) {
      FetchMaps.findPlaces( "병원", { location: latlng, radius }, ( datas ) => {

        if ( ! datas ) return;

        for( const data of datas ) { /// place
          if ( ! data ) continue;

          const place_addr = data.address_name;
          const place_category_name = data.category_name;
          const place_id = data.id;
          const place_phone = data.phone;
          const place_name = data.place_name;
          const place_url = data.place_url;

          // 장소 - 마커 생성
          const place_pos = FetchMaps.setPosition( parseFloat(data.y), parseFloat(data.x) );
          
          const place_marker = FetchMaps.setMarker( place_pos );
          if ( ! place_marker ) continue;
          place_marker.setMap( curMap );
          setMarkers( [ ...mapMarkers, marker ] );
        }

        
      } );
    } // 
    
  };

  // 맵 : 초기화
  const clearMap = () => {

    // 유효 범위 초기화
    if ( mapRange ) mapRange.setMap(null);
    setMapRange(null);

    // 마커 모두 삭제
    for( const marker of mapMarkers ) {
      if ( ! marker ) marker.setMap(null);
    }
    setMarkers( [] ); // 마커 초기화
  };



  /* useEffect 
  */
  useEffect( () => {}, []);


  /**
   * 
   */
  const onClick = () => {

    if ( ! mapContainerRef?.current || ! UI.map || ! kakao ) return; 

    if ( map ) clearMap();

    if ( "geolocation" in navigator ) {
      // 현재 좌표 검색
      navigator.geolocation.getCurrentPosition( (pos) => {
        // const position = FetchMaps.setPosition( pos.coords.latitude, pos.coords.longitude );
        const position = FetchMaps.setPosition( 37.5012446735418, 127.025011541805 );
        if ( position ) initMap( position ); // 지도 렌더링
      } );
    }
    else {
      // 주소 검색 
      FetchMaps.getLatLngByAddress("서울 서초구 서초동 1308-6", ( addrs ) => {

        const latlng = { lat : 0, lng: 0 };
        const addr = addrs.length ? addrs[0] : null; // x - LNG, y- LAT

        if ( addr ) {
          latlng.lng = parseFloat(addr.x); // x - lng
          latlng.lat = parseFloat(addr.y); // y - lat
        }
        else {
          // 초기 값
          latlng.lng = 127.025011541805; // x - lng
          latlng.lat = 37.5012446735418; // y - lat
        }

        const position = FetchMaps.setPosition(latlng.lat, latlng.lng);
        if ( position ) initMap( position ); // 지도 렌더링
      });
    }

  }


  return (<>
    <div className="anchor-wrap anchor-map-wrap">
        <button className="btn anchor anchor-map" aria-expanded="false" data-count="0" onClick={onClick}>
          <i className="fa-solid fa-map"></i>
        </button>
        <div className="map-content-wrap map-wrap">
          <div className="map-content map" id="map" ref={mapContainerRef}></div>
        </div>
      </div>
  </>);
};