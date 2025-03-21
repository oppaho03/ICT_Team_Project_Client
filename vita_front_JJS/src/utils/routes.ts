import React from "react";
import { createBrowserRouter, LoaderFunction } from "react-router-dom";

import PageLayout from "../componenets/layout/PageLayout.tsx";
import Home from '../pages/Home.tsx';
import ChatSession from "../pages/ChatSession.tsx";
import Login from "../pages/Login.tsx";
import FindId from "../pages/FindId.tsx";
import FindPassword from "../pages/FindPassword.tsx";
import MyPage from "../pages/MyPage.tsx";
import PostList from "../pages/Boards/PostList.tsx";
import Board from "../pages/Board.tsx";
import PostCreate from "../pages/Boards/PostCreate.tsx";
import PostDetail from "../pages/Boards/PostDetail.tsx";
import PostEdit from "../pages/Boards/PostEdit.tsx";

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
        path: '/auth/login',
        element: React.createElement(Login),
      },
      {
        path: '/auth/find-id',
        element: React.createElement(FindId),
      },
      {
        path: '/auth/find-password',
        element: React.createElement(FindPassword),
      },
      {
        path: '/members/mypage',
        element: React.createElement(MyPage),
      },
      {
        path: '/board',
        element: React.createElement(Board),
      },
      {
        path: '/posts',
        element: React.createElement(PostList),
      },
      {
        path: '/posts/new',
        element: React.createElement(PostCreate),
      },
      {
        path: '/posts/:id',
        element: React.createElement(PostDetail),
      },
      {
        path: '/posts/:id/edit',
        element: React.createElement(PostEdit),
      },
    ]
  },
]);


export default routes;
