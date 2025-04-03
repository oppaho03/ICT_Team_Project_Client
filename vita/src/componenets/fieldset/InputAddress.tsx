/**
 * 컴포넌트 : 필드셋 - 입력 : 주소 
 */
import React, { KeyboardEvent, useState } from "react";
import DaumPostcode from "react-daum-postcode";

interface InputAddressProps {
  onChange?: (addr: string) => void;
}

export default function InputAddress ({onChange}: InputAddressProps) {

  const [isOpen, setOpen] = useState(false);
  const [ value, setValue ] = useState( '' );

  const onKeyUp = ( e: KeyboardEvent  ) => {
    const t = e.target as HTMLInputElement;

    if ( e.key.toLowerCase() === 'escape' ) {
      setOpen( false ); // 주소 검색 창 닫기
    }

  };

  // 주소 : 검색 및 선택 완료
  const onCompleated = ( result: any ) => {
   
    let zipcode = result.zonecode;
    let addr = result.address;

    setValue( zipcode + ' ' + addr );
    setOpen( false );
  }

  return ( <>
    <div className="input-wrap">
      {/* 주소 */}
      <input type="text" className="form-control" name="address" placeholder="" data-is-validation='0'onFocus={() => setOpen(true)} value={value} onChange={(e) => {
            setValue(e.target.value);
            if (onChange) onChange(e.target.value);
          }} onKeyUp={onKeyUp} /> 
      <div className="post-code-container">
        { isOpen && 
          <React.Fragment>
            <button type="button" className="btn-close" onClick={() => setOpen( false )}></button>
            <DaumPostcode className="post-code-content" style={{height: '320px'}} defaultQuery="" onComplete={onCompleated}/>
          </React.Fragment>
        }
      </div>
    </div>
  </>);
}