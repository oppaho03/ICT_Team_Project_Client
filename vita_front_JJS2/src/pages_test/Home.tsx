/**
 * 
 */
// import React from "react";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginBox from "./LoginBox";
import LoginTest from "./LoginTest";


export default function Home () {

    
  const location = useLocation();
  
  /* App.useEffect( ... )
  */
  useEffect( () => {
    
    console.log(location.pathname);
  }, [] );

  return ( <>
    <h1>HOME</h1>
    {/* <LoginTest/> */}
    <LoginBox/>













    
  </> );
};