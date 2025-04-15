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

  const bootstrap = window.bootstrap; // 부트스트랩 객체
  const offcanvasRef  = useRef<HTMLDivElement>( null ); 
  

  const [ map, setMap ] = useState<any>(null);
  const [ mapLevel, setMapLevel ]= useState<number>(4); 
  const [ mapRange, setMapRange ] = useState<any>(null);
  const [ mapMarkers, setMarkers ] = useState<any[]>([]);

  const [ place, setPlace ] = useState<string>("병원");
  const [ countPlace, setCountPlace ] = useState<number>(0);

  /* 맵 옵션 
  */ 
  const [ toggledSearchBar, setToggledSearchBar ] = useState<boolean>(false);

  
  const kakao = window.kakao; // 카카오 맵 객체
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const [ toggle, setToggle ]= useState<boolean>(false);

  /**
   * 
   * @param {string} address 
   */
  const searchByAddress = ( address: string ) => {

    

    FetchMaps.getLatLngByAddress(address, ( result ) => {

      const latlng = { lat : 0, lng: 0 };
      const addr = result.length ? result[0] : null; // x - LNG, y- LAT

      console.log(addr);

      if ( addr ) {
        latlng.lng = parseFloat(addr.x); // x - lng
        latlng.lat = parseFloat(addr.y); // y - lat
      }
      else {
        latlng.lng = 127.025011541805; // x - lng
        latlng.lat = 37.5012446735418; // y - lat
      }

      const position = FetchMaps.setPosition(latlng.lat, latlng.lng);
      if ( position ) initMap( position ); // - 지도 렌더링
    });
  }

  // https://apis.map.kakao.com/web/sample/drawShape/
  const initMap = ( latlng:any ) => {

    let curMap;

    if ( ! map ) {
      const objMap = new kakao.maps.Map(mapContainerRef.current, { 
        center: latlng, 
        level: mapLevel, 
        mapTypeId:kakao.maps.MapTypeId.ROADMAP 
      });
      setMap( objMap ); // map 객체 삽입
      curMap = objMap;
    }
    else {
      clearMap();
      curMap = map;
    }

    curMap.setDraggable(true);
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
    // 장소 검색 
    if ( true ) {

      /// 장소 검색 : place 
      FetchMaps.findPlaces( place, { location: latlng, radius }, ( datas ) => {

        if ( ! datas ) {
          setCountPlace(0);
          return;
        }
        else setCountPlace( datas.length );
        

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

    curMap.setCenter( latlng ); // 중심 이동
    
  };

  // 맵 : 초기화
  const clearMap = () => {

    // 유효 범위 초기화
    if ( mapRange ) mapRange.setMap(null);
    setMapRange(null);

    // 마커 모두 삭제
    for( const marker of mapMarkers ) {
      if ( marker ) marker.setMap(null);
    }
    setMarkers( [] ); // 마커 초기화

  };


  /**
   * 버튼 바인드 
   * @param e 
   * @returns 
   */
  const onClickByButton = ( e: React.MouseEvent<HTMLButtonElement> ) => {

    const _CLASS_TOGGLED_ = "toggled";

    const t = e.target as HTMLButtonElement;
    const tagName = t && t.tagName ? t.tagName.toLowerCase() : null;
    if ( tagName != "button" ) return;

    if ( t.name == "toggle-search" ) {
      setToggledSearchBar( ! toggledSearchBar );
    }
    else if ( ["d-hs", "d-ds"].includes( t.name ) === true ) {
      
      if ( t.parentNode ) {
        const _other = t.parentNode.querySelector( `.${_CLASS_TOGGLED_}` );
        if ( _other ) _other.classList.remove( _CLASS_TOGGLED_ );

        t.classList.toggle( _CLASS_TOGGLED_ );
      }

      let place_name = t.name == "d-hs" ? "병원" : "약국";
      setPlace( place_name ); // 장소 설정
      
    }
    else if ( ["zoom-in", "zoom-out"].includes( t.name ) === true ) {
      if ( ! map ) return;

      let lv = mapLevel;
      if ( t.name == "zoom-in" ) lv -= 1;
      else if ( t.name == "zoom-out" ) lv += 1;

      if ( lv < 1 ) lv = 1;
      else if ( lv > 14 ) lv = 14;

      setMapLevel( lv );
      map.setLevel(lv); // 맵 줌 인 아웃
    }

  }; 


  const onSubmitBySearch = ( e: React.FormEvent<HTMLFormElement> ) => {

    e.preventDefault();

    const t = e.target as HTMLFormElement; // Form 

    let s = t.s.value;
    if ( ! s.trim().length ) s = "서울 서초구 서초동 1308-6";

    searchByAddress( s );

  };


  /* useEffect 
  */
  useEffect( () => {

    if ( offcanvasRef?.current ) {
      offcanvasRef.current.addEventListener("shown.bs.offcanvas", () => {
        setToggle(true);
      });
      offcanvasRef.current.addEventListener("hide.bs.offcanvas", () => {
        setToggle(false);
      });
    }

  }, []);


  /**
   * 
   */
  const onClick = () => {

    if ( bootstrap ) {

      const offcanvas = offcanvasRef?.current ? new bootstrap.Offcanvas(offcanvasRef?.current) : null;
      if ( offcanvas ) { 

        // setToggle
        if ( ! toggle )  offcanvas.show();
       
      }
      else return;
    } 

    if ( ! mapContainerRef?.current || ! UI.map || ! kakao ) return; 

    if ( map ) clearMap();

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

    // if ( "geolocation" in navigator ) {
      
    //   // 현재 좌표 검색
    //   navigator.geolocation.getCurrentPosition( (pos) => {
    //     // const position = FetchMaps.setPosition( pos.coords.latitude, pos.coords.longitude );
    //     const position = FetchMaps.setPosition( 37.5012446735418, 127.025011541805 );
        
    //     if ( position ) initMap( position ); // 지도 렌더링
    //   } );
    // }
    // else {

    //   // 주소 검색 
    //   FetchMaps.getLatLngByAddress("서울 서초구 서초동 1308-6", ( addrs ) => {

    //     const latlng = { lat : 0, lng: 0 };
    //     const addr = addrs.length ? addrs[0] : null; // x - LNG, y- LAT

    //     if ( addr ) {
    //       latlng.lng = parseFloat(addr.x); // x - lng
    //       latlng.lat = parseFloat(addr.y); // y - lat
    //     }
    //     else {
    //       // 초기 값
    //       latlng.lng = 127.025011541805; // x - lng
    //       latlng.lat = 37.5012446735418; // y - lat
    //     }

    //     const position = FetchMaps.setPosition(latlng.lat, latlng.lng);
    //     if ( position ) initMap( position ); // 지도 렌더링
    //   });
    // }

  }


  return (<>
    <div className="anchor-wrap anchor-map-wrap">
        
        <button className="btn anchor anchor-map" aria-expanded="false" data-count={countPlace} onClick={onClick} disabled={toggle}>
          <i className="fa-solid fa-map"></i>
        </button>

        <div className="offcanvas offcanvas-bottom map-content-wrap map-wrap" tabIndex={-1} aria-labelledby="offcanvas-anchor-map-labelledby" id="offcanvas-anchor-map" ref={offcanvasRef} >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvas-anchor-map-labelledby">
              <i className="fa-solid fa-location-dot me-2"></i>주변 검색
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body small position-relative p-0">
            
            <div className="map-option-wrap"> 

              {/* 옵션: 필터 */}
              <div className="map-option option-filter">
                {/* 버튼: 검색어 입력란 토글 */}
                <button className="btn btn-has-icon" name="toggle-search" aria-expanded={ toggledSearchBar ? "true" : "false" } onClick={onClickByButton}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                {/* 버튼 그룹: 줌 인 / 아웃 */}
                <button className="btn btn-has-icon" name="zoom-in" onClick={onClickByButton}>
                  <i className="fa-solid fa-magnifying-glass-plus"></i>
                </button>
                <button className="btn btn-has-icon" name="zoom-out" onClick={onClickByButton}>
                  <i className="fa-solid fa-magnifying-glass-minus" ></i>
                </button>
                {/* 버튼 그룹: 병원/ 약국 */}
                {/* flex-row flex-lg-nowrap flex-lg-row gap-2 justify-content-lg-end btn-group */}
                <div className="row btn-group m-0">
                  <button className="btn btn-has-icon toggled" name="d-hs" onClick={onClickByButton}>
                    <i className="fa-solid fa-stethoscope"></i>
                  </button>
                  <button className="btn btn-has-icon" name="d-ds" onClick={onClickByButton}>
                    <i className="fa-solid fa-prescription-bottle-medical"></i>
                  </button>
                </div>
              </div> 

              {/* 옵션: 검색 (폼)) */}
              <form className="form form-option map-option option-search" role="form" tabIndex={-1} action="/signin" method="post" data-expanded={ toggledSearchBar ? "1" : "0" } onSubmit={onSubmitBySearch}>
                <div className="form-control-field field-s">
                  <div className="form-control-field__input-container">
                    <div className="input-wrap d-flex align-items-center">
                      
                      <label className="has-icon"><i className="fa-solid fa-location-dot"></i></label>
                      
                      <input type="text" className="form-control form-control-unstyled flex-grow-1 flex-shrink-1" name="s" placeholder="검색할 주소를 입력해주세요." />

                      <button type="submit" className="btn btn-has-icon" >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>

                    </div> { /* .input-wrap */ }
                  </div>
                </div>
              </form> { /* .map-option.option-filter */ }
            </div>

            <div className="map-content map" id="map" ref={mapContainerRef}></div>



          </div>

          
        </div>

      </div>
  </>);
};