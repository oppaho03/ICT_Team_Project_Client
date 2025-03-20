/**
 *  GSAP : 인터페이스
 */

/* 인터페이스 : GSAP - ScrollTrigger 옵션
 */
export interface IScrollTriggerOptions {
  id: string | null,
  markers: boolean, 
  trigger: Element | null,
  start: string | number,
  end: string | number,
  scroller: HTMLElement | Element | null,
  scrub: boolean | number,
  pin: HTMLElement | Element | string | boolean,
  pinSpacing: string | boolean,
  toggleId: string | number | null,
  toggleClass: string | {targets: Element, className: string} | null,
  horizontal: boolean,
  refreshPriority: number, 
  anticipatePin: number,
  snap: boolean | number | Array<any> | Object | Function,
  invalidateOnRefresh: boolean,
  fastScrollEnd: boolean | number,
  once: boolean,
  animation: any,
  onLeaveBack: ((e: any | null) => void) | null, 
  onLeave: ((e: any | null) => void) | null,
  onEnterBack: ((e: any | null) => void) | null,
  onEnter: ((e: any | null) => void) | null,
  onUpdate: ((e: any | null) => void) | null,
  onToggle: ((e: any | null) => void) | null, 
  endTrigger: ((e: any | null) => void) | null, 
  onRefresh: ((e: any | null) => void) | null, 
  onRefreshInit: ((e: any | null) => void) | null
}
  
/**
 * GSAP, ScrollTrigger 플러그인 옵션(option, argument) 반환
 * @param { IScrollTriggerOptions }  options
 * @return { IScrollTriggerOptions }
 */
export function setScrollTriggerOptions( options: Partial<IScrollTriggerOptions> = {} ) {
  const temp: IScrollTriggerOptions = {
    id: null,
    markers: false, 
    trigger: null,
    start: "top top",
    end: "bottom top",
    scroller: null,
    scrub: false,
    pin: false,
    pinSpacing: false,
    toggleId: null,
    toggleClass: null,
    horizontal: false,
    refreshPriority: 0, 
    anticipatePin: 0,
    snap: false,
    invalidateOnRefresh: false,
    fastScrollEnd: true,
    animation: null,
    once: false,
    onLeaveBack: null,
    onLeave: null,
    onEnterBack: null,
    onEnter: null,
    onUpdate: null,
    onToggle: null,
    endTrigger: null,
    onRefresh: null,
    onRefreshInit: null
  };
  return { ...temp, ...options };
}

/* 인터페이스 : GSAP - TimeLineOptions 옵션
 * - timeline 옵션(파라메터) 인터페이스 정의 
 * - https://gsap.com/docs/v3/GSAP/Timeline/
 */
export interface ITimeLineOptions {
  defaults: any | null, /// Timeline 개체들의 공통 또는 기본 속성 
  repeat: number, // 0: default, -1: loop
  repeatDelay: number, 
  paused: boolean, 
  yoyo: boolean,
  timeScale: number, /// 1: 기본 속도
  onRepeat: ((e: any | null) => void) | null,
  onStart: ((e: any | null) => void) | null,
  onUpdate: ((e: any | null) => void) | null,
  onComplete: ((e: any | null) => void) | null,
};

/**
 * GSAP, TimeLineOptions 플러그인 옵션(option, argument) 반환
 * @param { ITimeLineOptions }  options
 * @return { ITimeLineOptions }
 */
export function setTimelineOptions ( options: Partial<ITimeLineOptions> = {} ): ITimeLineOptions {
  const temp: ITimeLineOptions = {
    defaults: null,  
    repeat: 0,
    repeatDelay: 0, 
    paused: false, 
    yoyo: true,
    timeScale: 1, 
    onRepeat: null,
    onStart: null,
    onUpdate: null,
    onComplete: null,
  };
  return { ...temp, ...options };
}