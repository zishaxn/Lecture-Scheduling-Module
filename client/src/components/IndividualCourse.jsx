import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const CourseName = styled.h1`
  margin-bottom: 20px;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 800px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin: 10px;
  padding: 20px;
  width: 45%;
  box-sizing: border-box;
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

const Form = styled.form`
  width: 75%;
  background-color: #2c3e50;
  color: white;
  border: 1px solid transparent;
  border-radius: 15px;
  margin: 1rem;
  text-align: center;
  padding: 20px;

  input,
  select {
    margin: 10px 0;
    padding: 10px;
    width: calc(100% - 20px);
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  button {
    margin-top: 20px;
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
  }
`;

const IndividualCourse = (user) => {
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(undefined);

  const adminKey = localStorage.getItem("secret-key-admin");
  const userKey = localStorage.getItem("secret-key");

  useEffect(() => {
    if (adminKey) {
      //  navigate("/admin");
      setCurrUser(JSON.parse(adminKey));
    } else if (userKey) {
      navigate("/instructor");
    } else {
      navigate("/");
    }
  }, [navigate,adminKey,userKey]);

  // Example course details, replace with actual API call
  const [courseDetails, setCourseDetails] = useState({
    courseName: "Sample Course",
    instructors: [
      {
        name: "Instructor 1",
        date: "January 1, 2022",
        location: "Location 1",
        lecture: "DSA",
      },
      {
        name: "Instructor 2",
        date: "February 1, 2022",
        location: "Location 2",
        lecture: "Web Dev",
      },
      // Add more instructors as needed
    ],
  });

  const [lectureData, setLectureData] = useState({
    instructor: "",
    date: "",
    subject: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to submit lecture data to the server
    console.log("Lecture Scheduled:", lectureData);
    // Optionally, you can reset the form after successful submission
    setLectureData({
      instructor: "",
      date: "",
      subject: "",
      location: "",
    });
  };

  return (
    <Container>
      <TopBar>
        <Logout />
        <Heading>Welcome admin</Heading>
      </TopBar>
      <CourseName>{}</CourseName>
      <Form onSubmit={handleSubmit}>
        <h2>Schedule a Lecture</h2>
        <input
          type="text"
          name="instructor"
          placeholder="Instructor Name"
          value={lectureData.instructor}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={lectureData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={lectureData.subject}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={lectureData.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Schedule Lecture</button>
      </Form>
      <CardList>
        {courseDetails.instructors.map((instructor, index) => (
          <Card key={index}>
            <h2>{instructor.name}</h2>
            <p>Date: {instructor.date}</p>
            <p>Location: {instructor.location}</p>
            <p>Lecture: {instructor.lecture}</p>
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

export default IndividualCourse;
