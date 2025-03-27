/**
 * 컴포넌트 : 블록 - 컨텐츠 없음
 */
export default function BlockNotFound( props: {title?: string, contents: string }  ) {

  console.log( props );
  return(<>
    <div className="block-not-found">
      { props.title && <h2>{props.title}</h2> }
      <p>{props.contents}</p>
    </div>
  </>);
}