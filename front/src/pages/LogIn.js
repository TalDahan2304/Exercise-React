import React from 'react';
import {useState} from 'react';
import styled from "styled-components";
import Axios from 'axios';

// id="userName" placeholder="User Name" autocomplete="off"
// id="password" placeholder="Password" autocomplete="off"

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
    <ContainerStyle>
        <h3>Log In</h3>
        <InputStyle type="text"
        onChange={(e)=>
            {setUserName(e.target.value);
        }}
        />
        <InputStyle type="text" 
        onChange={(e)=>
            {setPassword(e.target.value);
        }}
        />
        <ButtonStyle onClick={login}>Log In</ButtonStyle>
        <h1>{loginStatus}</h1>
      </ContainerStyle> 
  )
}
const ContainerStyle = styled.div`
  background: #f8f0e8a6;;
  margin: auto;
  width: fit-content;
  padding: 40px 60px;
  border-radius: 15px;
  flex-direction: column;
  display: flex;
  color:var(--color-iconCard-purple);
  margin:auto ;
  align-items: center;
  h1{
    font-size:2.5rem;
    padding-top:3px;
    color: var(--color-primary-purple);
  }
  span {
    color: #f3af6b;
  }
  h3{
    margin-bottom: 0.7rem;
  }
  
`;
const InputStyle = styled.input`
  margin: 0.7rem;
  background: #bf6b18a6;;
  border: none;
  border-radius:5px ;
  border-bottom: 1px solid;
  border-bottom-color: #bf6b18a6;;
  font-size: 18px;
  padding: 0.5rem;
  width:18rem ;
`;

const ButtonStyle = styled.button`
  padding: 0.5rem 2rem ;
  font-size: 16px;
  font-weight:bolder ;
  cursor: pointer;
  transition: 0.5s all ease;
  border-radius: 10px;
  border: 1px solid;
  background: #bf6b18a6; ;
  color:#f8f0e8a6 ;
  border: 1px solid #f8f0e8a6 ;
  margin-top:1rem ;

  :hover {
    background: #f8f0e8a6;
    color:var(--color-primary-purple) ;
    border: 1px solid var(--color-primary-purple) ;
    transform: scale(1.02) ;
  }
`
export default LogIn