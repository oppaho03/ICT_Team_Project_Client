import { Suspense, useEffect, useState } from 'react'

import './App.css'

import "./ts/app"

import { RouterProvider } from 'react-router-dom' 

import Loading from './componenets/common/Loading' 
import routes from './utils/routes' // ROUTER 설정


function App() {
  
  const [count, setCount] = useState(0)

  return (
    <>
      <Suspense fallback={<Loading />}> 
        <RouterProvider router={routes} />
      </Suspense>
    </>
  )
}

export default App
