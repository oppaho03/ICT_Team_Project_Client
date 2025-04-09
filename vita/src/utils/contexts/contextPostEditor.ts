import { createContext } from "react";

/* Context: 포스트 에디터
 */
interface IPostEditorFormData {
  isChecked: ( () => boolean ),
  form: HTMLFormElement | null,
  editor: any,
}

export const PostEditorFormDataDefaultValue: IPostEditorFormData = {
  isChecked: () => true,
  form: null,
  editor: null,
}

export const PostEditorFormDataContext = createContext<IPostEditorFormData>( PostEditorFormDataDefaultValue ); 

