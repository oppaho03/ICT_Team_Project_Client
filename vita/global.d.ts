declare global {
  interface Window {
    // 모달 
    modalBindOpened: ( modal: HTMLElement | null, callback: ()=>void ) => void; // 모달 이벤트 바인드 - 열림
    modalBindClosed: ( modal: HTMLElement, callback: ()=>void ) => void; // 모달 이벤트 바인드 - 닫힘 
    modalAlter: ( message: string, title: string | null ) => HTMLElement | null; // 모달 - 일반 메시지

    // 로그인 세션 관련
    isLoggedIn: () => boolean;  // 로그인 유무 검사

    // 맵
    initMap: () => void;
    resetMap: () => void;
  }
}
  
export {};