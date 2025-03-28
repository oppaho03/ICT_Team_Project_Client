/** 
 * Global commons valiables or functions scripts
 */


/**
 * PC / 모바일 식별하기 
 * @return {boolean}
 */
function isPC () {
    if ( /Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) return false;
    else return true;
  }
  
  /**
   * 변수 또는 함수, 객체 등등 'undefined' 체크하기 
   * @param { any } value - all type values
   * @return { boolean }
   */
  function isUndefined ( value ) {
    return typeof value == "undefined" ? true : false;
  }
  
  /**
   * 변수의 값이 유효한지 확인 
   * @param { any } value - object | undefined | boolean | number | bigint | string | symbol ...
   * @return { boolean }
   */
  function isset ( value ) {
    return typeof value != "undefined" && value != null && ( typeof value == "string" && value.trim() != "" ) ? true : false;
  }
  
  /**
   * URL 쿼리 파싱 (Parsing URL query string)
   * @param {string} search_key 
   * @param {null|string} url 
   * @return { SVGStringList }
   */
  function parseURLQuery (search_key, url) {
      // get current url
      if ( !url || typeof url === undefined ) url = document.location.href;
      
      // remove to '#(sharp)'
      if ( url.indexOf('#') !== -1 ) url = url.slice(0, url.indexOf('#'));
      var querys = (url.slice(url.indexOf("?") + 1, url.length)).split('&');
  
      var result; // find result value
  
      for ( var i in querys ) {
          var [key, value] =  querys[i].split('=');
          if ( typeof value == 'undefined' ) value = '';
  
          if ( key == search_key ) {
              result = value; // set result value
              break;
          }
      }
  
      return result ? result : '';
  }
  
  
/*--------------------------------------------------------------
  * 'String' Functions 
--------------------------------------------------------------*/

/**
 * 문자열을 글자 단위로 자르고 <span /> 테그에 넣는 함수
 * @param {string} value - 파싱 대상 문자열
 * @return {string} 
 */
function toSpannedLine ( value ) {
  
  var value = value.replace(/<(?!br\s*\/?)[^>]+>/gi, ''); // 모든 HTML 태그 제거, <br> 제외
  if ( ! value || value.trim() == '' ) return ''
  
  var lines = value.split( /<br\s*\/?>/i );  // <br> 기준으로 텍스트 분리
  var wrappedLines = lines.map( function( line ) {
    
    var count = -1;
    
    return Array.from( line ).map( function( char ) {

      count ++; 
      char = char.replace(/(\r\n|\n|\r)/g, '<br/>'); // <br/>
      char = char.replace(/ /g, '&nbsp;'); // ' ' -> &nbsp;
      
      if ( char == "<br/>" ) return char;
      else return `<span class='d-inline-block' data-index="${count}">${char}</span>` 

    } ).join('');

  } );



  return wrappedLines.join('<br>'); // <br>을 추가하여 원래 형식으로 반환
}

/**
 * 포맷터: 일자 및 시간 정보 
 * @param {string} format 
 * @return {string}
 */
function formatDateTime( format ) {
  const curDate = new Date();

  const dateTime = {
    yyyy: curDate.getFullYear(),
    MM: String(curDate.getMonth() + 1).padStart(2, "0"),
    dd: String(curDate.getDate()).padStart(2, "0"),
    HH: String(curDate.getHours()).padStart(2, "0"),
    mm: String(curDate.getMinutes()).padStart(2, "0"),
    ss: String(curDate.getSeconds()).padStart(2, "0"),
  };
  
  return format.replace( /yyyy|MM|dd|HH|mm|ss/g, (match) => dateTime[match] );
}

/**
 * 포맷터: 일자 및 시간 정보 
 * @param {string} value 
 * @param {string} format 
 * @return {string}
 */
function formatDateTimeByISO8601( value, format ) {
  const curDate = new Date( value );

  const dateTime = {
    yyyy: curDate.getFullYear(),
    MM: String(curDate.getMonth() + 1).padStart(2, "0"),
    dd: String(curDate.getDate()).padStart(2, "0"),
    HH: String(curDate.getHours()).padStart(2, "0"),
    mm: String(curDate.getMinutes()).padStart(2, "0"),
    ss: String(curDate.getSeconds()).padStart(2, "0"),
  };
  
  return format.replace( /yyyy|MM|dd|HH|mm|ss/g, (match) => dateTime[match] );
}



/**
 * 포맷터: 문자열에서 숫자만 추출
 * @param {string} value 
 * @return {string}
 */
function formatNumbers( value ) {
  return value && value.length ? value.replace( /[^0-9]/g, '' ) : "";
}

  
/*--------------------------------------------------------------
  * DOM Control Functions
--------------------------------------------------------------*/

// 스크립트 추가 (add script)
/**
 * Dom 에 <script> 추가하기
 * @param {string} url 
 */
function addScript (url) {
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

/**
 * 스크린(윈도우) 가로 반환 
 * @return {number} 
 */
function getDocumentWidth() { return window.innerWidth || document.body.clientWidth; }

/**
 * 스크린(윈도우) 세로 반환 
 * @return {number} 
 */
function getDocumentHeight() { return window.innerHeight || document.body.clientHeight; }

/**
 * 스크린(윈도우) Scroll Top 반환 
 * @return {number} 
 */
function getDocumentScrollTop() { return document.body.scrollTop || document.documentElement.scrollTop; }

/**
 * HTML 엘리멘트 오프셋(offset) 불러오기 
 * @param {HTMLElement | Element | undefined | null} elem - 파싱 대상 문자열
 * @return { { top: number, left: number } }
 */
function getOffset( elem ) {

  var top = 0;
  var left = 0;

  if ( typeof elem != 'undefined' && elem ) {

    while ( elem ) {
      top += elem.offsetTop;
      left += elem.offsetLeft;
      elem = elem.offsetParent; // 부모 요소로 이동
    }
  }

  return { top: top, left: left };
}

/**
 * 스크롤 하단 - 고정
 * @param {HTMLElement | null} elem 
 * @return
 */
function scrollToBottom ( elem ) {
  if ( ! elem ) elem = window; 
  
  elem.scrollTo({
    top: elem.scrollHeight,
    behavior: 'smooth'
  });
} 

/**
 * 엘리멘트 이벤트 바인드 설정
 * @param { any } elem 
 * @param { string | object } name 
 * @param { function } handler 
 * @param { object | null } options 
 * @returns 
 */
function setEventListener (elem, name, handler, options) {
  /*
    'options'
    - useCapture: boolean, 이벤트 캡처링을 여부 (기본값 false)
    - once : boolean, 단일 호출 (기본값 false)
    - passive : boolean, true 시 preventDefault()를 호출하지 않을 것을 알림 -> 스크롤 성능을 향상
  */
    if ( !elem ) return;
    if ( !options ) options = null;

    if ( elem instanceof NodeList ) {
        Array.prototype.slice.call(elem).forEach(function(item){ return setEventListener(item, name, handler, options); });
        return;
    }

    // window.attachEvent ? window.attachEvent("onload", handler) : window.addEventListener("load", handler, { once : true });
    elem.attachEvent
    ? elem.attachEvent(typeof name == "string" ? name : name[0], handler)
    : elem.addEventListener(typeof name == "string" ? name : name[1], handler, options);
}

/**
 * 엘리멘트 이벤트 바인드 취소
 * @param { HTMLElement } elem 
 * @param { string | object } name 
 * @param { function } handler 
 * @returns 
 */
function resetEventListener (elem, name, handler) {
    if ( !elem ) return;

    if ( elem instanceof NodeList ) {
        Array.prototype.slice.call(elem).forEach(function(item){ return resetEventListener(item, name, handler); });
        return;
    }

    elem.detachEvent
    ? elem.detachEvent(typeof name == "string" ? name : name[0], handler)
    : elem.removeEventListener(typeof name == "string" ? name : name[1], handler);
}

/**
 * STT 음성 인식 객체 반환 (표준)
 * https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
 * @returns { SpeechRecognition|window.webkitSpeechRecognition|window.mozSpeechRecognition|window.msSpeechRecognition|null }
 */
function setSpeechRecognition() {

  let srec = null;

  if ( ('webkitSpeechRecognition' in window ) ) {

    try {
      // SpeechRecognition 객체 생성
      srec = new ( window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition )();

      if ( ! srec )
        throw new Error("Can't not instance SpeechRecognition object.");

      srec.lang = 'ko-KR';
      srec.continuous = false;
      srec.interimResults = true;
      srec.maxAlternatives = 1;


    }
    catch ( err ) {
      srec = null;
    } 

  }

  return srec;
}


/*--------------------------------------------------------------
  * 'sessionStorage'
--------------------------------------------------------------*/
/**
 * 'sessionStorage' 불러오기
 * @param {string} key 
 * @return {any}
 */
function getSessionStorage( key ) {
  if ( ! ("sessionStorage" in window) ) return null;
  return sessionStorage.getItem( key );
}

/**
 * 'sessionStorage' 등록 및 수정
 * @param {string} key 
 * @param {string|null} value 
 * @return {boolean}
 */
function setSessionStorage( key, value ) {
  if ( ! ("sessionStorage" in window) ) return false;

  sessionStorage.setItem(key, value);
  if ( sessionStorage.getItem( key ) != value ) return false;

  return true;
}

/**
 * 'sessionStorage' 삭제
 * @param {string} key 
 * @return {void}
 */
function removeSessionStorage( key ) {
  if ( ("sessionStorage" in window) ) sessionStorage.removeItem( key );
}

/**
 * 'sessionStorage' 모두 삭제
 * @param {string} key 
 * @return {void}
 */
function clearSessionStorage( key ) {
  if ( ("sessionStorage" in window) ) sessionStorage.clear();
}


/* export
*/
export { 
  isPC, 
  isUndefined,
  isset, 
  parseURLQuery,
  addScript,
  getDocumentWidth,
  getDocumentHeight,
  getDocumentScrollTop,
  getOffset , 
  scrollToBottom,

  setEventListener,
  resetEventListener,

  setSpeechRecognition,

  toSpannedLine,

  formatDateTime,
  formatDateTimeByISO8601,
  formatNumbers,

  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  clearSessionStorage
  
};