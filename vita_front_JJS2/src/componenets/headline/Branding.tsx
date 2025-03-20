/**
 * UI - 타이틀 : 브랜딩 <h1>
 */
export default function Branding() {

  const title = import.meta.env.VITE_SITE_NAME;

  return (<>
    <div className="app-branding">
      <h1 className="app-branding-headline mb-0" title={title} aria-label={title} itemProp="headline">
        <a className="brand has-logo-img" href="#"> 
          <img className="logo-img" width="auto" height="50" src="./assets/resources/logo_outline.svg" alt="VITA" decoding="async" /> 
          <span>{title}</span> 
        </a>
      </h1>
    </div> {/* .app-branding */}
  </>);
};