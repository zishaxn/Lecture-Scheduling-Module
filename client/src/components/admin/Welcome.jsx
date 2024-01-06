import React from "react";
import styled from "styled-components";
import Logout from "../Logout";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Instructors from "./Instructors";
import Courses from "./CoursesAdmin";

export default function Welcome({ user }) {
  const navigate = useNavigate();

   useEffect(() => {
     if (localStorage.getItem("secret-key-admin")) {
       navigate("/admin");
     } else if (localStorage.getItem("secret-key")) {
       navigate("/instructor");
     }
     else { 
       navigate("/");
       
     }
   }, []);

  return (
    <WelcomeContainer>
      <TopBar>
        <Logout />
        <Heading>Welcome Admin</Heading>
      </TopBar>
      <MainContent>
        <Instructors user={user} />
        <Courses />
      </MainContent>
    </WelcomeContainer>
  );
}

const WelcomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e369ae;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem; /* Add your desired gap value */
  min-height: 100%;
  min-width: 100%;
  background-color: red;

  > * {
    width: 50%;
  }
`;

const TopBar = styled.div`
  width: 100%;
  background: #000;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  color: white;
  font-size: 36px;
  font-weight: bold;
  margin-top: 40px;
`;
