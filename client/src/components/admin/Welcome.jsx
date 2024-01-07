import React from "react";
import styled from "styled-components";
import Logout from "../Logout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Instructors from "./Instructors";
import Courses from "./CoursesAdmin";
import IndividualCourse from "../IndividualCourse";

export default function Welcome({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    } else {
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
        <InstructorsContainer>
          <Instructors user={user} />
        </InstructorsContainer>
        <CoursesContainer>
          <Courses user={user} />
        </CoursesContainer>
      </MainContent>
    </WelcomeContainer>
  );
}

const WelcomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom right, #e369ae, #8e44ad);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  min-height: 100%;
  width: 99.50%;
`;

const InstructorsContainer = styled.div`
  width: 30%;
`;

const CoursesContainer = styled.div`
  width: 70%;
`;

const TopBar = styled.div`
  width: 100%;
  background: #2c3e50;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-top: 5px;
`;
