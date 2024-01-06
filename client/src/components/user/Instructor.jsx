import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";

const Instructor = ({ instructor }) => {
  const navigate = useNavigate();
  const [currUser,setCurrUser] = useState(undefined)

  useEffect(() => {
    const adminKey = localStorage.getItem("secret-key-admin");
    const userKey = localStorage.getItem("secret-key");

    if (adminKey) {
      navigate("/admin");
    } else if (userKey) {
      setCurrUser(JSON.parse(userKey).username);
    } else {
      navigate("/");
    }
  }, [navigate]);


  return (
    <WelcomeContainer>
      <TopBar>
        <Logout />
        <Heading>Welcome {currUser}</Heading>
      </TopBar>
      <MainContent>
      </MainContent>
    </WelcomeContainer>
  );
};

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

export default Instructor;