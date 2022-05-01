import React from 'react';
import styled from "styled-components";
import UsersData from "../components/UsersData";

function Users() {
  return (
      <Table>
          <UsersData/>
      </Table>
  )
}


const Table=styled.div`
  background: #fafafa;
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  font-family: 'Assistant', sans-serif;
`;
export default Users