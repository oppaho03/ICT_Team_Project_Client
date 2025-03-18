/**
 * UI - 버튼 : 서랍 메뉴 토글 버튼
 */
export default function DrawableMenuToggle() {

  /* 바인드 : 클릭, 서랍 메뉴 토글
  */
  const handleToggler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const t = e.target as HTMLButtonElement ;

    // 'extend' 클래스
    // aria-expanded 속성
    t.setAttribute( 
      'aria-expanded', 
      t.classList.toggle( 'extend' ) ? 'true' : 'false' 
    ); 

    document.body.classList.toggle('expanded-menu-drawable');
  };

  return (<>
    <button className="menu-toggle menu-toggle-hb" aria-label="서랍 메뉴" id="drawable-menu-toggle" aria-controls="drawable-menu" tabIndex={-1} onClick={handleToggler}>
      <svg width="100" height="100" viewBox="0 0 100 100"  >
        <path className="line line-1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
        <path className="line line-2" d="M 20,50 H 80" />
        <path className="line line-3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
      </svg>
    </button>
  </>);
};