import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    let id;
    if (localStorage.getItem('secret-key') != null) {
      id = await JSON.parse(localStorage.getItem("secret-key"))._id;
    }
    else if (localStorage.getItem('secret-key-admin') != null) { 
      id = await JSON.parse(localStorage.getItem("secret-key-admin"))._id;
    }
    console.log('id :',id);
    const data = await axios.get(`${logoutRoute}/${id}`);
    console.log('data is here');
    console.log(data);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
      <LogoutButton onClick={handleClick}>Logout</LogoutButton>
  );
}


const LogoutButton = styled.button`
  background-color: #200079;
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;

  &:hover {
    background-color: #ff0e0e;
  }
`;

