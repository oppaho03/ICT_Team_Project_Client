import React from "react";
import { createBrowserRouter, LoaderFunction } from "react-router-dom";

import PageLayout from "../componenets/layout/PageLayout.tsx";
import Home from '../pages/Home.tsx';
import ChatSession from "../pages/ChatSession.tsx";
import SignIn from "../pages/SignIn.tsx";

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
      { 
        path: '/signin',
        element: React.createElement(SignIn),
      }
    ]
  },
]);


export default routes;
