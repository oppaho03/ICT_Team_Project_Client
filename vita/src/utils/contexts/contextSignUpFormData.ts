import { createContext } from "react";

/* Context: 회원가입 (SignUp)
 */
interface ISignUpFormData {
  isChecked: ( () => boolean ),
  form: HTMLFormElement | null,
  email: string,
  email_verification: boolean,
  accpet: boolean, 
}

export const SignUpFormDataDefaultValue: ISignUpFormData = {
  isChecked: () => true,
  form: null,
  email: "",
  email_verification: false, 
  accpet: false,
}

export const SignUpFormDataContext = createContext<ISignUpFormData>( SignUpFormDataDefaultValue ); 

