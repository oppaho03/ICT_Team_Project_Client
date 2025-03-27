/**
 * UI 상태 관리 조각
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUIState {
  expanded: boolean, // - 서랍메뉴 확장 토글
  modal: boolean, // - 모달 토글
  loading: boolean, // - 메인 로딩 토글 
  update_menu_chat_sessions : string | null, // - 메뉴: 채팅 세션 갱신
}

const initialState: IUIState = {
  expanded: true,
  modal: false,
  loading: false,
  
  update_menu_chat_sessions: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState, // { ... } as IUIState
  reducers: {
    setExpanded( state, action: PayloadAction<boolean> ) { state.expanded = action.payload; },
    setModal( state, action: PayloadAction<boolean> ) { state.modal = action.payload; },
    setLoading( state, action: PayloadAction<boolean> ) { 
      state.loading = action.payload; 
    },
    setUpdateMenuChatSessions( state, action: PayloadAction<string> ) { 
      state.update_menu_chat_sessions = action.payload; 
    },
    toggleExpanded( state ) { 
      state.expanded = !state.expanded; 
    },
    toggleModal( state ) { state.modal = !state.modal; },
    toggleLoading( state ) { state.loading = !state.loading;},
  }
});

export const { setExpanded, setModal, setLoading, setUpdateMenuChatSessions, toggleExpanded, toggleModal, toggleLoading } = uiSlice.actions;
export default uiSlice.reducer;