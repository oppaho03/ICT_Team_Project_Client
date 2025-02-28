# FRONT PROFJECT 


## 추가 커스텀 패키지 설치 목록
1. **react-router-dom**
    - `$ npm install react-router-dom`
    - **React** 애플리케이션에서 라우팅을 관리하는 라이브러리
    
    - **<BrowserRouter />** 엘리멘트를 사용한 라우팅 
    ```jsx 
    import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

    function Home() {
    return <h1>홈 페이지</h1>;
    }

    function About() {
    return <h1>소개 페이지</h1>;
    }

    export default function App() {
    return (
        <BrowserRouter>
        <nav>
            <Link to="/">홈</Link>
            <Link to="/about">소개</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
        </BrowserRouter>
    );
    }
    ```

    - **createBrowserRouter()** 함수를 사용한 라우팅
    ```typescript
    import React from "react";
    import { createBrowserRouter } from "react-router-dom";

    const routes = createBrowserRouter([
        {
            path: "/",
            element: React.createElement(Home), // <Home />
        },
        {
            path: "/about",
            element: React.createElement(About), // <About />,
        },
    ]);

    export default routes;
    ```
    ```tsx
    import { Suspense } from 'react'
    import { RouterProvider } from 'react-router-dom' 

    import routes from './routes' // ROUTER 설정

    function App() {
        return(
            <>
                <Suspense fallback={<Loading />}> 
                    <RouterProvider router={routes} />
                </Suspense>
            </>            
        )
    }

    ```

2. **localforage**
    - `$ npm install localforage`
    - IndexedDB, WebSQL, LocalStorage를 자동으로 관리하는 브라우저 스토리지 라이브러리
    - 비동기 방식(Promise) 지원
    - JSON 저장장

    ```js
    import localforage from "localforage";

    localforage.setItem("user", { name: "John", age: 30 }).then(() => {
        console.log("저장 완료");
    });

    localforage.getItem("user").then((value) => {
        console.log(value); // { name: "John", age: 30 }
    });
    ```
3. **match-sorter**
    - `$ npm install match-sorter`
    - 배열에서 문자열 검색 및 정렬을 쉽게 하는 라이브러리

    ```js
    import { matchSorter } from "match-sorter";

    const fruits = ["apple", "banana", "grape", "orange"];
    const results = matchSorter(fruits, "ap"); // "ap"이 포함된 항목 찾기
    console.log(results); // ["apple", "grape"]
    ```
4. **sort-by**
    - `$ npm install sort-by`
    - 객체 배열을 특정 키 값으로 정렬하는 유틸리티 라이브러리

    ```js
    import sortBy from "sort-by";

    const users = [
    { name: "Charlie", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 28 },
    ];

    users.sort(sortBy("age"));
    console.log(users);
    // [{ name: "Alice", age: 25 }, { name: "Bob", age: 28 }, { name: "Charlie", age: 30 }]
