import React from "react";
import { createBrowserRouter, LoaderFunction } from "react-router-dom";

import PageLayout from "../componenets/layout/PageLayout.tsx";
import Home from '../pages/Home.tsx';
import ChatSession from "../pages/ChatSession.tsx";
import SignIn from "../pages/SignIn.tsx";
import SignUp from "../pages/SignUp.tsx";
import Logout from "../pages/Logout.tsx";
import MyPage from "../pages/MyPage.tsx";
import ChatSessions from "../pages/ChatSessions.tsx";

/**
 * createBrowserRouter() : JSON 형식으로 라우팅 설정
*/
const routes = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(PageLayout),
    errorElement: undefined,
    // loader: () => React.createElement(Loader), // 렌더링 전 데이터 다운로드 
    children: [
      {
        index: true,
        element: React.createElement(Home),
      },
      {
        path: '/c',
        element: React.createElement(ChatSession),
      },
      { // 페이지 : 로그인
        path: '/signin',
        element: React.createElement(SignIn),
      },
      { // 페이지 : 회원 가입
        path: '/signup',
        element: React.createElement(SignUp),
      },
      { // 페이지 : 로그아웃
        path: '/logout',
        element: React.createElement(Logout),
      },
      { // 페이지 : 마이페이지
        path: '/members',
        element: React.createElement(MyPage),
      },
      { // 페이지 : 공개 채팅 세션 리스트
        path: '/sessions',
        element: React.createElement(ChatSessions),
      },
    ]
  },
]);


export default routes;
