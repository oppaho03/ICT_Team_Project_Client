import SVGLogo from "../svgLogo";

/**
 * UI - 타이틀 : 브랜딩 (폼) <h1>
 */
export default function BrandingForm() {

  const title = import.meta.env.VITE_SITE_NAME;

  return (<>
    <div className="app-branding">
      <h2 className="app-branding-headline mb-0" title={title} aria-label={title} itemProp="headline">
        <a className="brand has-logo-img" href="#"> 
          {/* <img className="logo-img" width="auto" height="50" src="./assets/resources/logo_outline.svg" alt="VITA" decoding="async" />  */}
          <div className="logo-img"><SVGLogo /></div>
          <span>{title}</span> 
        </a>
      </h2>
      <div className="app-branding-contents">
        <p>더 건강한 삶을 위한 AI</p>
        <p>건강을 위한 스마트 케어</p>
      </div>
    </div> {/* .app-branding */}
  </>);
};