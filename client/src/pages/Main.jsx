import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Main = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
    };
    
    useEffect(() => {
      if (localStorage.getItem("secret-key-admin")) {
        navigate("/admin");
      } else if (localStorage.getItem("secret-key")) {
        navigate("/instructor");
      }
    }, []);

  return (
    <MainContainer>
      <Message>Welcome to Course Schedule</Message>
      <ButtonContainer>
        <Button onClick={handleLoginClick}>Login</Button>
        <Button onClick={handleRegisterClick}>Register</Button>
      </ButtonContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4e0eff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #2a0080;
  }
`;

export default Main;
