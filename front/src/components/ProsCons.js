import React from 'react';
import styled from "styled-components";
import {useEffect , useState} from 'react';
import Axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';    

function ProsCons() {
  const [prosConslist, setprosConslist ]=useState([]);
  const [pros, setPros]=useState("");
  const [cons, setCons]=useState("");
  var curlocation = window.location.href;
  let idData = curlocation.split("/").slice(-1).pop();

  const add=() =>{ 
    Axios.post("http://localhost:4000/add",{
        pros:pros,
        cons:cons,
        id: idData,
    }).then((response)=>{
      console.log(response);
    });

    setprosConslist([
      ...prosConslist,
      { pros:pros, cons:cons,id: idData},
    ]);
  };

  useEffect(()=>{
    Axios.get("http://localhost:4000/userpage/proscons/testt").then( (response)=>{
      console.log(response);
      setprosConslist(response.data);
     });
   },[]);

  return (
    <div>
      <br></br>
      <h1>ProsCons</h1>
      <br></br>
      <Proscons>
        <input className="Pros" type="text" placeholder="Pros"
        onChange={(e)=>
            {setPros(e.target.value);
        }}
        />
        <input className="Cons" type="text" placeholder="Cons"
        onChange={(e)=>
            {setCons(e.target.value);
        }}
        />
        <button className="add" onClick={add}>Add</button>
      </Proscons>
    <ProsConsDataStyled>
          <br></br>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">id</TableCell>
                <TableCell align="center">Pros</TableCell>
                <TableCell align="center">Cons</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prosConslist.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.pros}</TableCell>
                  <TableCell align="center">{row.cons}</TableCell>
                  {/* <TableCell align="center"><button onClick={()=>{deletecontact(idData)}}>Delete</button></TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
    </ProsConsDataStyled>

    </div>
  )
}

const ProsConsDataStyled=styled.div`
  
`;
const Proscons=styled.div`
  .Pros, .Cons{
  outline:none;
  background: #FAFAFA;
  border: 0.5px solid #BFC0C0 ;
  border-radius: 10px;
  padding: 0.5rem;
  margin: 1rem;
  margin-top: 1rem;
  font-size: 16px;
  font-family: 'Assistant', sans-serif;
  }
  .add{
  width: 70px;
  height: 30px;
  border: none;
  background: #1d3557;
  color: white;
  cursor: pointer;
  font-size: 16px;
  border-radius: 10px;
  transition: all 0.3s ease;
  font-family: 'Assistant', sans-serif;
  margin-top: 2rem ;
  
  :hover {
    background: white;
    color: #1d3557;
    border: 2px solid #1d3557;
  } 
  }
`;

export default ProsCons