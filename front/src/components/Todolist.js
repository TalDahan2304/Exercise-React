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

function Todolist() {
  const [checked, setChecked] = React.useState(true);
  const [taskslist, settaskslist ]=useState([]);
  const[task, setTask]=useState("");
  var curlocation = window.location.href;
  let idData = curlocation.split("/").slice(-1).pop();

  function selectShortlistedApplicant(colname,userid,e){
    const checked = e.target.checked;
    if (checked) {
      Axios.post("http://localhost:3000/todolist",{
        colname:colname,
        userid:userid,
        value:1,
    }).then((response)=>{
        console.log(response)
    });
      
    }
    else{
      Axios.post("http://localhost:3000/todolist",{
        colname:colname,
        userid:userid,
        value:0,
    }).then((response)=>{
        console.log(response)
    });
    }
  };

  const addTask=() =>{ 
    Axios.post(`http://localhost:4000/addTask/${idData}`,{
        task:task,
        id: idData,
    }).then((response)=>{
      console.log(response);
    });

    settaskslist([
      ...taskslist,
      {task:task, id: idData},
    ]);
  };

  useEffect(()=>{
    Axios.get("http://localhost:4000/userpage").then( (response)=>{
      settaskslist(response.data);
     });
   },[]);

   const deleteTask= (id) => {
    Axios.delete(`http://localhost:3003/api/delete/${id}`)
  }
  return (
    <div>
      <NewTask>
      <h1>To Do List</h1>
      <br></br>
        <input className="newTask" type="text" placeholder="New Task"
        onChange={(e)=>
            {setTask(e.target.value);
        }}
        />
        <button  className="addnewTask" onClick={addTask}>Add Task</button>
        </NewTask>
        <TasksDataStyled>
        <br></br>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">id</TableCell>
                <TableCell align="center">Task</TableCell>
                <TableCell align="center">Delete Task</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskslist.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.task}</TableCell>
                  {row.check_task === 0 &&
                  <TableCell align="center"><input type="checkbox" onClick={(e) => {
                    selectShortlistedApplicant("check_task",row.id,e);
                  }}/></TableCell>
                  }
                  {row.check_task === 1 &&
                    <TableCell align="center"><input type="checkbox" defaultChecked={checked} onClick={(e) => {
                      selectShortlistedApplicant("check_task",row.id,e);
                  }}/></TableCell>
                  }
                  <TableCell align="center"><button onClick={deleteTask}>Delete</button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
    </TasksDataStyled>
    </div>
  )
}

const TasksDataStyled=styled.div`
  
`;
const NewTask=styled.div`
  .newTask{
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
  .addnewTask{
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

export default Todolist