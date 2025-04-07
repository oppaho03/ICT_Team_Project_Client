import SVGLogo from "../svgLogo";

/**
 * UI - 타이틀 : 브랜딩 (컨텐츠) <h1>
 */

interface IProps {
  title: string,
  description?: string[] 
}

export default function ContentHeadline( prop: IProps ) {

  const title = prop.title;
  const description = prop.description ?? [];
  

  return (<>
    <hgroup className="content-title-wrap">
      <h2 className="content-title mb-0" title={title} aria-label={title} itemProp="headline">
        <i className="fa-solid fa-hashtag me-2"></i>
        {title}
      </h2>
      { description.length > 0 && 
        <div className="content-title-description">
          <p></p>
        </div>
      }
    </hgroup> {/* .app-branding */}
  </>);
};