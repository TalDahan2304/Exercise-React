import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import Users from "./pages/Users";
import LogIn from "./pages/LogIn";


function App (){

  return (
    
    <BrowserRouter>
    <div className="App">
    {/* <Navigation/> */}
      <Routes path="/"> 
        <Route index element={<LogIn/>}></Route>
        <Route path="/users" element={<Users/>}></Route>
      </Routes>

    
    </div>
    </BrowserRouter>


  );

}



export default App;
