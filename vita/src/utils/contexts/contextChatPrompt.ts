import { createContext } from "react";
import { IDataCategory } from "../interfaces";

/* 채팅 프롬프트 : 필터 
 */
interface IChatPromptFilter {
  departments: Array<IDataCategory> | null,
  diseases: Array<IDataCategory> | null,
}
const ChatPromptFilterDefaultValue: IChatPromptFilter = {
  departments: [],
  diseases: []
}
export const ChatPromptFilterContext = createContext<IChatPromptFilter>( ChatPromptFilterDefaultValue ); 

