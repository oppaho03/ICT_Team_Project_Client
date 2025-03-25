import { createContext } from "react";
import { ITermsContext } from "./interfaces";

const TermsContextDefaultValue: ITermsContext = {
  departments: [],
  diseases: [],
  intentions: [],
  categories: []
} 

export const TermsContext = createContext<ITermsContext>( TermsContextDefaultValue ); 
