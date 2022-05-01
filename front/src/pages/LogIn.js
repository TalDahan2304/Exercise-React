import React from 'react';
import {useState} from 'react';
import styled from "styled-components";
import Axios from 'axios';

function LogIn() {
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");

    const[loginStatus,setLoginStatus]=useState("");

    // const [valid, setvalid]=useState(false);

    const login=()=>{
        Axios.post("http://localhost:3000/LogIn",{
            username:username,
            password:password,
        }).then((response)=>{
            console.log(response) //Delete Later
            if(response.data.message){
                setLoginStatus(response.data.message);
            }else{
                window.location.href = `/users`;
            }
        });
    };

  return (
    <Loginpage>
      <ContainerStyle>
          <h3>Login</h3>
          <InputStyle type="text"  placeholder="UserName"
          onChange={(e)=>
              {setUserName(e.target.value);
          }}
          />
          <InputStyle type="text" placeholder="Password"
          onChange={(e)=>
              {setPassword(e.target.value);
          }}
          />
          <ButtonStyle onClick={login}>Log In</ButtonStyle>
          <h1>{loginStatus}</h1>
      </ContainerStyle> 
    </Loginpage>
  )
}

const Loginpage=styled.div`
    background: #fafafa;
    height: 100vh;
    align-items: center;
    display: flex;
    justify-content: center;
    font-family: 'Assistant', sans-serif;
    color: #1d3557;

`;
const ContainerStyle = styled.div`
   background: #fafafa;
   border: 2px solid gray;
   border-radius: 15px;
   text-align: center;
   display: flex;
   flex-direction: column;
   align-items: center;
   display: flex;
   justify-content: center;
   padding: 200px;
   height: 200px;
   width: 20%;
   
`;
const InputStyle = styled.input`
  outline:none;
  border:none;
  background: #FAFAFA;
  border-bottom: 0.5px solid #BFC0C0 ;
  padding: 0.5rem;
  margin: 1rem;
  margin-top: 1rem;
  font-size: 16px;
  font-family: 'Assistant', sans-serif;
`;

const ButtonStyle = styled.button`
  width: 70px;
  height: 30px;
  border: none;
  background: #1d3557;
  color: white;
  cursor: pointer;
  font-size: 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  font-family: 'Assistant', sans-serif;
  margin-top: 2rem ;
  
  :hover {
    background: white;
    color: #1d3557;
    border: 2px solid #1d3557;
  } 
  
`
export default LogIn