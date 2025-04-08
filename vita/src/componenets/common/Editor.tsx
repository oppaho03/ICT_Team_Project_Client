/**
 * 컴포넌트 : 에디터
 * - https://quilljs.com/playground
 */
import { useEffect, useRef, useState } from 'react';
import shortid from 'shortid';

export default function Editor () {

  const EID = shortid.generate();

  const [ editor, setEditor ] = useState<any>( null );
  const editorElemRef = useRef<HTMLDivElement>(null);

  /**
   * 초기화
   */
  useEffect( () => {

    if ( 
      ! editor 
      && window.Quill 
      && (editorElemRef && editorElemRef.current ) ) { // 에디터 초기화
      const quill = new window.Quill( editorElemRef.current, {
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [ 'bold', 'italic', 'underline', 'strike' ],
            [ 'image', 'blockquote', 'code-block' ],
            ['link'],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            
          ]
        },
        placeholder: '내용을 입력하세요.', 
        theme: 'snow'
      });

      setEditor( quill ); // - updated editor
    }

    return () => { 
      setEditor(null); 
    }

  }, [] );

  return (<>
    <div ref={editorElemRef} id={EID} className={`post-editor`}>
      <p></p>
    </div>
  </>);
}