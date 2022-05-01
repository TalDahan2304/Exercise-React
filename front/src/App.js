import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from "./pages/Users";
import LogIn from "./pages/LogIn";
import UserPage from "./pages/UserPage";
import GlobalStyle from "./components/GlobalStyle";


function App (){

  return (
    
    <BrowserRouter>
    <div className="App">
      <GlobalStyle/>
      <Routes path="/"> 
        <Route index element={<LogIn/>}></Route>
        <Route path="/users" element={<Users/>}></Route>
        <Route path="/userpage/:id" element={<UserPage/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>


  );

}



export default App;
