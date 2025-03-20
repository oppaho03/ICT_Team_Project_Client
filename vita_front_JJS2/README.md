# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

---
## 추가 커스텀 패키지 설치 목록
---

- **react-router-dom**
    - `$ npm install react-router-dom`
    - **React** 애플리케이션에서 라우팅을 관리하는 라이브러리
    
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

- **Redux, Redux Toolkit**
  - `$ npm install @reduxjs/toolkit react-redux` 
  - `$ npm install -D @types/react-redux` 
  
  - Slice 1: userSlice (사용자 정보 관리)
  ```js
    // 사용자 정보 관리 slice
    // src/store/userSlice.ts
    import { createSlice, PayloadAction } from '@reduxjs/toolkit';

    interface UserState {
      id: number | null;
      name: string | null;
    }

    const initialState: UserState = {
      id: null,
      name: null,
    };

    const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
          state.id = action.payload.id;
          state.name = action.payload.name;
        },
        logout: (state) => {
          state.id = null;
          state.name = null;
        },
      },
    });

    export const { setUser, logout } = userSlice.actions;
    export default userSlice.reducer;
  ```
  - Slice 2: postsSlice (게시글 목록 관리)
  ```js
    // 게시글 목록 관리 slice
    // src/store/postsSlice.ts
    import { createSlice, PayloadAction } from '@reduxjs/toolkit';

    interface Post {
      id: number;
      title: string;
      body: string;
    }

    interface PostsState {
      posts: Post[];
    }

    const initialState: PostsState = {
      posts: [],
    };

    const postsSlice = createSlice({
      name: 'posts',
      initialState,
      reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
          state.posts = action.payload;
        },
        addPost: (state, action: PayloadAction<Post>) => {
          state.posts.push(action.payload);
        },
      },
    });

    export const { setPosts, addPost } = postsSlice.actions;
    export default postsSlice.reducer;
  ```
  - Store 설정
  ```js
    // configureStore를 사용하여 두 개의 slice를 결합하여 하나의 store로 관리합니다
    // src/store/index.ts
    import { configureStore } from '@reduxjs/toolkit';
    import userReducer from './userSlice';
    import postsReducer from './postsSlice';

    const store = configureStore({
      reducer: {
        user: userReducer,
        posts: postsReducer,
      },
    });

    export default store;
  ```
  - Provider로 Store 연결
  ```js
    // React 앱에서 Provider를 사용하여 store를 애플리케이션에 연결
    // src/App.tsx
    import React from 'react';
    import { Provider } from 'react-redux';
    import store from './store';
    import UserComponent from './UserComponent';
    import PostsComponent from './PostsComponent';

    function App() {
      return (
        <Provider store={store}>
          <div className="App">
            <UserComponent />
            <PostsComponent />
          </div>
        </Provider>
      );
    }

    export default App;
  ```
  - UserComponent: 사용자 정보 표시 및 수정
  ```js
    // src/UserComponent.tsx
    import React from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { setUser, logout } from './store/userSlice';

    const UserComponent: React.FC = () => {
      const dispatch = useDispatch();
      const user = useSelector((state: any) => state.user);

      const handleSetUser = () => {
        dispatch(setUser({ id: 1, name: 'John Doe' }));
      };

      const handleLogout = () => {
        dispatch(logout());
      };

      return (
        <div>
          <h2>User Information</h2>
          <p>{user.name ? `Name: ${user.name}` : 'No user logged in'}</p>
          <button onClick={handleSetUser}>Set User</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      );
    };

    export default UserComponent;
  ```
  - PostsComponent: 게시글 목록 표시 및 추가
  ```js
    // src/PostsComponent.tsx
    import React from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { setPosts, addPost } from './store/postsSlice';

    const PostsComponent: React.FC = () => {
      const dispatch = useDispatch();
      const posts = useSelector((state: any) => state.posts.posts);

      const handleSetPosts = () => {
        dispatch(
          setPosts([
            { id: 1, title: 'Post 1', body: 'This is the first post.' },
            { id: 2, title: 'Post 2', body: 'This is the second post.' },
          ])
        );
      };

      const handleAddPost = () => {
        dispatch(addPost({ id: 3, title: 'Post 3', body: 'This is the third post.' }));
      };

      return (
        <div>
          <h2>Posts</h2>
          <button onClick={handleSetPosts}>Set Posts</button>
          <button onClick={handleAddPost}>Add Post</button>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default PostsComponent;
  ```

- **localforage**
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

- **match-sorter**
    - `$ npm install match-sorter`
    - 배열에서 문자열 검색 및 정렬을 쉽게 하는 라이브러리

    ```js
      import { matchSorter } from "match-sorter";

      const fruits = ["apple", "banana", "grape", "orange"];
      const results = matchSorter(fruits, "ap"); // "ap"이 포함된 항목 찾기
      console.log(results); // ["apple", "grape"]
    ```

- **sort-by**
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
    ```

- **shortid**
    - `$ npm install shortid`
    - `$ npm install @types/shortid`
    - 짧은 ID를 생성하는 라이브러리 ( 반대개념 UUID )

    ```js
      import shortid from 'shortid';

      const randomId = shortid.generate();
      console.log(randomId); // 예: "S1d3f4g"
    ```

- **axios**
    - `$ npm install axios`
    - `$ npm install @types/axios`

