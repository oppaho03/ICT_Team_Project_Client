/**
 * import * 
 * - library classes
 */
import { Suspense } from 'react'

import "./styles/styles.css"
import "./ts/app"

import { RouterProvider } from 'react-router-dom' 

import Loader from './componenets/common/Loader' // (공통) 컴포넌트 : 대기, 로더 
import routes from './utils/routes' // ROUTER 설정

import { useSelector } from 'react-redux';


function App() {
  
  // const [count, setCount] = useState(0)
  const ui = useSelector( (state: any) => state.ui );
  console.log(ui);

  return (
    <>
      <Suspense fallback={<Loader />}> 
        
        <RouterProvider router={routes} />
      </Suspense>
    </>
  )
}

export default App
