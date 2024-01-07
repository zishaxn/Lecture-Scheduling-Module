import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { allInstructors } from "../../utils/APIRoutes";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  color: white;
  font-size: 24px;
  margin: 20px 0;
  background-color: #2c3e50;
  padding: 10px;
  border-radius: 10px;
`;

const CardContainer = styled.div`
  width: 100%;
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 15px 15px 0 0;
  }

  .card-content {
    padding: 10px;
  }

  h2 {
    margin-bottom: 10px;
    font-size: 20px;
  }

  p {
    margin-bottom: 5px;
    font-size: 16px;
  }
`;

const InstructorName = styled.h3`
  color: #333;
  font-size: 18px;
  margin: 8px;
`;

export default function Instructors({ user }) {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        if (user) {
          const response = await axios.get(`${allInstructors}/${user._id}`);
          setInstructors(response.data);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };
    fetchInstructors();
  }, [user]);

  return (
    <Container>
      <Heading>Instructors</Heading>
      {instructors.map((instructor, index) => (
        <CardContainer key={index}>
          <Card>
            <h2>{instructor.username}</h2>
          </Card>
        </CardContainer>
      ))}
    </Container>
  );
}
