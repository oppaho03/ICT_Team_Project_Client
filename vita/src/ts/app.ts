import * as Common from "../../public/assets/js/commons.js";

declare var gsap: any | null; // GSAP 코어 객체
declare var ScrollTrigger: any | null;
declare var ScrollToPlugin: any | null;

declare var kakao: any | null;

( function() {
  
  /**
   * GSAP 플러그인 초기화
   */
  if ( typeof gsap != 'undefined' ) {

    // 플러그인 등록
    const plugins = [];

    if ( Common.isset( ScrollTrigger ) ) plugins.push( ScrollTrigger );
    if ( Common.isset( ScrollToPlugin ) ) plugins.push( ScrollToPlugin );

    gsap.registerPlugin(...plugins ); 

    // 초기화 - gsap
    gsap.defaults({ duration: 1, ease: "power1.out", });
    // ScrollTrigger.refresh();
    

  }

  /* 윈도우 이벤트: window 
  */
  Common.setEventListener( window, 'load', ( e:Event ) => {

  }, { once: true } );

} () );