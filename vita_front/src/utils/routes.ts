import React from "react";
import { createBrowserRouter } from "react-router-dom";

import PageLayout from "../componenets/layout/PageLayout.tsx";
import Home from '../pages/Home.tsx';

/**
 * createBrowserRouter() : JSON 형식으로 라우팅 설정
*/
const routes = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(PageLayout),
    loader: undefined,
    errorElement: undefined,
    children: [
      {
        index: true,
        element: React.createElement(Home),
      },
    ]
  },
]);


export default routes;
