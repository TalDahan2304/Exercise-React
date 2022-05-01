import React from 'react';
import styled from "styled-components";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from 'axios';
import {useEffect} from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';

function UsersData() {
  const [checked, setChecked] = React.useState(true);
  const [userslist, setuserslist ]=useState([]);


  function selectShortlistedApplicant(colname,userid,e){
    const checked = e.target.checked;
    if (checked) {
      Axios.post("http://localhost:3000/setPermissions",{
        colname:colname,
        userid:userid,
        value:1,
    }).then((response)=>{
        console.log(response)
    });
      
    }
    else{
      Axios.post("http://localhost:3000/setPermissions",{
        colname:colname,
        userid:userid,
        value:0,
    }).then((response)=>{
        console.log(response)
    });
    }
  };

  useEffect(()=>{
   Axios.get("http://localhost:3000/users").then( (response)=>{
      setuserslist(response.data);
    });
  },[]);


  return (
    <UsersDataStyled>
      <h1>Users' management page</h1>
      <br></br>
      <br></br>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="center">username</TableCell>
            <TableCell align="center">password</TableCell>
            <TableCell align="center">phone</TableCell>
            <TableCell align="center">todolist</TableCell>
            <TableCell align="center">savecontacts</TableCell>
            <TableCell align="center">proscons</TableCell>
            <TableCell align="center">View page</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userslist.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.password}</TableCell>
              <TableCell align="center">{row.phonenumber}</TableCell>
              {row.todolist === 0 &&
                <TableCell align="center"><input type="checkbox" onClick={(e) => {
                  selectShortlistedApplicant("todolist",row.id,e);
              }}/></TableCell>
              }
              {row.todolist === 1 &&
                <TableCell align="center"><input type="checkbox" defaultChecked={checked} onClick={(e) => {
                  selectShortlistedApplicant("todolist",row.id,e);
              }}/></TableCell>
              }
              {row.savecontacts === 0 &&
                <TableCell align="center"><input type="checkbox" onClick={(e) => {
                  selectShortlistedApplicant("savecontacts",row.id,e);
              }}/></TableCell>
              }
              {row.savecontacts === 1 &&
                <TableCell align="center"><input type="checkbox" defaultChecked={checked} onClick={(e) => {
                  selectShortlistedApplicant("savecontacts",row.id,e);
              }}/></TableCell>
              }
              {row.proscons === 0 &&
                <TableCell align="center"><input type="checkbox" onClick={(e) => {
                  selectShortlistedApplicant("proscons",row.id,e);
              }}/></TableCell>
              }
              {row.proscons === 1 &&
                <TableCell align="center"><input type="checkbox"   defaultChecked={checked}  onClick={(e) => {
                  selectShortlistedApplicant("proscons",row.id,e);
              }}/></TableCell>
              }
              <TableCell align="center"><Link to={`/userpage/${row.id}`} className="link">View </Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </UsersDataStyled>
  );
}


const UsersDataStyled=styled.div`
  color: #1d3557;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-family: 'Assistant', sans-serif;

`;


export default UsersData;