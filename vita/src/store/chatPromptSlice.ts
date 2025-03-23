/**
 * 채팅 프롬프트 상태 관리 조각
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IChatPromptState {
  focus: boolean, 
  active: boolean,
  pending: boolean,
  recording: boolean,
  latestMessage: string | null,
}

const initialState: IChatPromptState = {
  focus: false,
  active: false,
  pending: false,
  recording: false,
  latestMessage: null
}

const chatPromptSlice = createSlice({
  name: 'prompt',
  initialState, // { ... } as IUIState
  reducers: {
    setFocus( state, action: PayloadAction<boolean> ) { state.focus = action.payload; },
    setActive( state, action: PayloadAction<boolean> ) { state.active = action.payload; },
    setPending( state, action: PayloadAction<boolean> ) { state.pending = action.payload; },
    setRecording( state, action: PayloadAction<boolean> ) { state.recording = action.payload; },
    setMessage ( state, action: PayloadAction<string | null> ) { state.latestMessage = action.payload; },
    toggleRecording( state ) { state.recording = !state.recording;},
  }
});

export const { setFocus, setActive, setPending, setRecording, setMessage, toggleRecording } = chatPromptSlice.actions;
export default chatPromptSlice.reducer;