import { configureStore  } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import chatPromptSlice from "./chatPromptSlice";


const store = configureStore({
  reducer: {
    ui: uiSlice, // UI 상태 관리 조각,
    prompt: chatPromptSlice // 채팅 프롬프트 상태 관리 조각
  }
});

export default store;