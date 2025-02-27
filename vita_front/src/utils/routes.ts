import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from '../pages/Home.tsx';

/**
 * createBrowserRouter() : JSON 형식으로 라우팅 설정
*/
const routes = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(Home),
    loader: undefined,
    errorElement: undefined,
    children: undefined
  },
]);


export default routes;
