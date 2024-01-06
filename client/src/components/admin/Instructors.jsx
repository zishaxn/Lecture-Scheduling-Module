import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { allInstructors } from "../../utils/APIRoutes";
import axios from "axios";

// Styled components for the instructor card
const Card = styled.div`
  background-color: #ffffff; /* Adjust the background color as needed */
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid transparent;
  border-radius: 35px;
  margin: 1rem 5px;
  text-align: center;
  padding: 10px 10px;
`;

const InstructorName = styled.h3`
  color: #333; /* Adjust the text color as needed */
  font-size: 18px;
  margin-bottom: 8px;
`;

const Container = styled.div`
  background-color: green;

  /* Add your container styles here */
  h1 {
    width: 50%;
    background-color: black;
    color: white;
    border: 1px solid transparent;
    border-radius: 35px;
    margin: 1rem 5px;
    text-align: center;
    padding: 10px 10px;
  }
`;

const CardContainer = styled.div`
  height: 100%;
  width: 50%;
`;

export default function Instructors({ user }) {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        if (user) {
          console.log(user);
          const response = await axios.get(`${allInstructors}/${user._id}`);
          setInstructors(response.data);

          console.log(instructors);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };
    fetchInstructors();
  }, [user]);

  return (
    <Container>
      <div>
        <h1>Instructors</h1>
        {instructors.map((instructor, index) => (
          <CardContainer key={index}>
            <Card>
              <InstructorName>{instructor.username}</InstructorName>
            </Card>
          </CardContainer>
        ))}
      </div>
    </Container>
  );
}
