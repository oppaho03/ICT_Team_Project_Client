import SVGLogo from "../svgLogo";

/**
 * UI - 타이틀 : 브랜딩 (헤드라인 없는) <h1>
 */
export default function BrandingNoHeadline() {

  return (<>
    <div className="app-branding-wrap no-headline">
      <div className="app-branding-outer">
        <div className="app-branding-inner">
          <div className="app-branding"> <SVGLogo /> </div>
        </div>
      </div>
    </div>
  </>);
};