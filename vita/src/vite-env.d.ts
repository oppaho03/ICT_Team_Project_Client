/// <reference types="vite/client" />
interface Window {

  isScrollYEnded: ( el: HTMLDivElement ) => boolean;

  // 모달 
  modalBindOpened: ( modal: HTMLElement, callback: ()=>void ) => void; // 모달 이벤트 바인드 - 열림
  modalBindClosed: ( modal: HTMLElement, callback: ()=>void ) => void; // 모달 이벤트 바인드 - 닫힘 
  modalAlter: ( message: string, title: string | null = null ) => HTMLElement | null; // 모달 - 일반 메시지

  // 로그인 세션 관련
  isLoggedIn: () => boolean; // 로그인 유무 검사

  // bootstrap 객체 
  bootstrap: any;

  // 카카오 맵 
  kakao: any

}