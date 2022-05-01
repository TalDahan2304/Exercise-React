import {useEffect , useState} from 'react';
import Todolist from "../components/Todolist";
import SaveContacts from "../components/SaveContacts";
import ProsCons from "../components/ProsCons";
import Axios from 'axios';
import styled from "styled-components";


function UserPage() {
  const[location,setLocation] = useState("");
  const[todolist,setTodolist] = useState("");
  const[savecontacts,setSavecontacts] = useState("");
  const[proscons,setProscons] = useState("");
  const[name,setName] = useState("");

  useEffect(()=>{
    let location = window.location.href;
    let idData = location.split("/").slice(-1).pop();
    setLocation(idData);
    Axios.get(`http://localhost:3000/userpage/${idData}`,{
    }).then((response)=>{
        const perm = response.data;
        setName(perm[0].username);
        setTodolist(perm[0].todolist)
        setSavecontacts(perm[0].savecontacts)
        setProscons(perm[0].proscons)
    });
  })
  return (
    <Userpage>
      {name && (<>
        <h1 className="nameTitle">{name}</h1>
        <br></br>
        {todolist === 1 && <Todolist/>}
        <br></br>
        {savecontacts ===1 && <SaveContacts/>}
        <br></br>
        {proscons === 1 && <ProsCons/>}
      </>)}
    </Userpage>
  )
}


const Userpage=styled.div`
  background: #fafafa;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Assistant', sans-serif;
  margin: auto;
  text-align: center;
  .nameTitle{
   color: #1d3557;
   font-family: 'Assistant', sans-serif;
   margin: 2rem;
   font-size: 38px;
  }
`;
export default UserPage;