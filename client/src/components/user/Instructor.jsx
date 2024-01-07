import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout";

const Instructor = ({ }) => {
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(undefined);

  const adminKey = localStorage.getItem("secret-key-admin");
  const userKey = localStorage.getItem("secret-key");

  useEffect(() => {
    if (adminKey) {
      navigate("/admin");
    } else if (userKey) {
      setCurrUser(JSON.parse(userKey)._id);
      console.log(currUser);
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
        <LecturesContainer>
          <SectionHeading>Your Upcoming Lectures</SectionHeading>
          <ScrollableContent>
            <LectureCard>
              <CardHeading>Course:</CardHeading>
              <CardContent>Sample Course</CardContent>

              <CardHeading>Lecture:</CardHeading>
              <CardContent>Sample Lecture</CardContent>

              <CardHeading>Date:</CardHeading>
              <CardContent>2024-01-01</CardContent>

              <CardHeading>Location:</CardHeading>
              <CardContent>Sample Location</CardContent>
            </LectureCard>
            <LectureCard>
              <CardHeading>Course:</CardHeading>
              <CardContent>Sample Course</CardContent>

              <CardHeading>Lecture:</CardHeading>
              <CardContent>Sample Lecture</CardContent>

              <CardHeading>Date:</CardHeading>
              <CardContent>2024-01-01</CardContent>

              <CardHeading>Location:</CardHeading>
              <CardContent>Sample Location</CardContent>
            </LectureCard>
            <LectureCard>
              <CardHeading>Course:</CardHeading>
              <CardContent>Sample Course</CardContent>

              <CardHeading>Lecture:</CardHeading>
              <CardContent>Sample Lecture</CardContent>

              <CardHeading>Date:</CardHeading>
              <CardContent>2024-01-01</CardContent>

              <CardHeading>Location:</CardHeading>
              <CardContent>Sample Location</CardContent>
            </LectureCard>
            <LectureCard>
              <CardHeading>Course:</CardHeading>
              <CardContent>Sample Course</CardContent>

              <CardHeading>Lecture:</CardHeading>
              <CardContent>Sample Lecture</CardContent>

              <CardHeading>Date:</CardHeading>
              <CardContent>2024-01-01</CardContent>

              <CardHeading>Location:</CardHeading>
              <CardContent>Sample Location</CardContent>
            </LectureCard>
            <LectureCard>
              <CardHeading>Course:</CardHeading>
              <CardContent>Sample Course</CardContent>

              <CardHeading>Lecture:</CardHeading>
              <CardContent>Sample Lecture</CardContent>

              <CardHeading>Date:</CardHeading>
              <CardContent>2024-01-01</CardContent>

              <CardHeading>Location:</CardHeading>
              <CardContent>Sample Location</CardContent>
            </LectureCard>
            <LectureCard>
              <CardHeading>Course:</CardHeading>
              <CardContent>Sample Course</CardContent>

              <CardHeading>Lecture:</CardHeading>
              <CardContent>Sample Lecture</CardContent>

              <CardHeading>Date:</CardHeading>
              <CardContent>2024-01-01</CardContent>

              <CardHeading>Location:</CardHeading>
              <CardContent>Sample Location</CardContent>
            </LectureCard>
            <LectureCard>
              <CardHeading>Course:</CardHeading>
              <CardContent>Sample Course</CardContent>

              <CardHeading>Lecture:</CardHeading>
              <CardContent>Sample Lecture</CardContent>

              <CardHeading>Date:</CardHeading>
              <CardContent>2024-01-01</CardContent>

              <CardHeading>Location:</CardHeading>
              <CardContent>Sample Location</CardContent>
            </LectureCard>
            {/* Add more LectureCard components as needed */}
          </ScrollableContent>
        </LecturesContainer>
      </MainContent>
    </WelcomeContainer>
  );
};

const WelcomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #f7eef0; /* Soft pinkish background */
`;

const MainContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  padding: 20px;
  overflow: hidden; /* Hide the scrollbar */
  width: 100%;
`;

const TopBar = styled.div`
  width: 100%;
  background: #2c3e50;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  color: #ecf0f1; /* Light grayish white */
  font-size: 36px;
  font-weight: bold;
  margin-top: 40px;
`;

const LecturesContainer = styled.div`
  width: 100%;
`;

const ScrollableContent = styled.div`
  display: flex;
  flex-wrap: wrap; /* Enable wrapping for flex container */
  justify-content: space-between;
  gap: 1rem;
  max-height: 500px; /* Set the maximum height to enable scrolling */
  overflow-y: auto; /* Enable vertical scrolling */
`;

const LectureCard = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 48%; /* Adjusted width to fit two cards in a row */
  box-sizing: border-box; /* Include padding and border in the width */
`;

const SectionHeading = styled.h2`
  color: #333; /* Dark grayish */
  font-size: 24px;
  margin-bottom: 15px;
`;

const CardHeading = styled.h3`
  color: #333;
  font-size: 18px;
  margin-bottom: 8px;
`;

const CardContent = styled.p`
  margin-bottom: 15px;
  font-size: 16px;
`;

export default Instructor;
