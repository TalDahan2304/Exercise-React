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

function SaveContacts() {
  const [contactslist, setcontactslist ]=useState([]);
  const [name, setName]=useState("");
  const [number, setNumber]=useState("");
  var curlocation = window.location.href;
  let idData = curlocation.split("/").slice(-1).pop();

  const addContact=() =>{ 
    Axios.post("http://localhost:4000/addContact",{
        name:name,
        number:number,
        id: idData,
    }).then((response)=>{
      console.log(response);
    });

    setcontactslist([
      ...contactslist,
      {name:name, number:number,id: idData},
    ]);
  };

  useEffect(()=>{
    Axios.get(`http://localhost:4000/userpage/savecontacts/test/${idData}`).then( (response)=>{
      console.log(response);
      setcontactslist(response.data);
     });
   },[]);

   const deletecontact= (id) => {
    Axios.delete(`http://localhost:4000/delete/${id}`)
  }

  return (
    <div>
      <br></br>
      <h1>Save Contacts</h1>
      <br></br>
      <Contacts>
        <input className="name" type="text" placeholder="Name"
        onChange={(e)=>
            {setName(e.target.value);
        }}
        />
        <input className="number" type="text" placeholder="Number"
        onChange={(e)=>
            {setNumber(e.target.value);
        }}
        />
        <button className="addContact" onClick={addContact}>Add Contact</button>
        </Contacts>
        <ContactsDataStyled>
        <br></br>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">id</TableCell>
                <TableCell align="center">name</TableCell>
                <TableCell align="center">number</TableCell>
                <TableCell align="center">Delete Contact</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactslist.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.number}</TableCell>
                  <TableCell align="center"><button onClick={()=>{deletecontact(idData)}}>Delete</button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
    </ContactsDataStyled>
    </div>
  )
}


const ContactsDataStyled=styled.div`
  
`;
const Contacts=styled.div`
  .name, .number{
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
  .addContact{
  width: 90px;
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
export default SaveContacts