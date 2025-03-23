import { setEventListener } from "../../public/assets/js/commons.js"

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 페이지 변경 - Input 초기화
 */
const InputReboot = () => {

  const location = useLocation();

  useEffect( () => {


    setEventListener( document.querySelectorAll('input[type="email"]'), 'keyup', (e:KeyboardEvent) => {
      const input = e.target as HTMLInputElement;
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if ( pattern.test( input.value ) ) input.dataset['isValidation'] = '1';
      else input.dataset['isValidation'] = '0';
    }, {} );

    console.log();

  }, [location] )

  return null;
};

export default InputReboot;