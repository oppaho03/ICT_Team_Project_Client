/**
 * 컴포넌트 : 필드셋 - 입력 : 주소 
 */
import { KeyboardEvent, useState } from "react";
import DaumPostcode from "react-daum-postcode";

interface InputAddressProps {
  onChange?: (addr: string) => void;
}



export default function InputAddress ({onChange}: InputAddressProps) {

  const [isOpen, setOpen] = useState(false);
  const [ value, setValue ] = useState( '' );

  const onKeyUp = ( e: KeyboardEvent  ) => {
    const t = e.target as HTMLInputElement;

    if ( e.key.toLowerCase() == 'escape' ) {
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
    {/* 주소 */}
    <input type="text" className="form-control" name="address" placeholder="" data-is-validation='0'onFocus={e => setOpen(true)} value={value} onChange={e => setValue(e.target.value)} onKeyUp={onKeyUp}/> 
    <div className="post-code-container">
      { isOpen ? (
      <DaumPostcode className="" style={{height: '320px'}} defaultQuery="" onComplete={onCompleated}/>
      ) : null }
    </div>
  </>);
}