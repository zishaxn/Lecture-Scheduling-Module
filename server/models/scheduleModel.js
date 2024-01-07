import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCourseSchedule,
  allInstructors,
  getCourseName,
  updateSchedule,
} from "../utils/APIRoutes";
import axios from "axios";

// Define color schemes
const ceruleanBlue = "#007ba7";
const ivoryCream = "#fffdd0";
const darkGray = "#333333";
const sageGreen = "#8f9779";
const dustyRose = "#d2b48c";
const champagnePink = "#fad6a5";
const velvetNavy = "#001f3f";
const white = "#ffffff";

// Styled components with color schemes
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  height: 100vh;
  background-color: ${ceruleanBlue};
`;

const TopBar = styled.div`
  width: 100%;
  background: ${velvetNavy};
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  color: ${white};
  font-size: 24px;
  font-weight: bold;
  margin-top: 5px;
`;

const CourseName = styled.h1`
  margin-bottom: 20px;
  color: ${ivoryCream};
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
`;

const CardList = styled.div`
  width: 100%;
  margin-top: 20px;
  overflow-x: auto;
  white-space: nowrap;
`;

const Card = styled.div`
  background-color: ${ivoryCream};
  border: 2px solid ${darkGray};
  border-radius: 15px;
  margin-right: 20px;
  padding: 20px;
  width: 300px;
  box-sizing: border-box;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  h2 {
    color: ${darkGray};
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    color: ${darkGray};
    font-size: 14px;
    margin-bottom: 5px;
  }
`;

const Form = styled.form`
  width: 45%;
  background-color: ${sageGreen};
  color: ${darkGray};
  border: 2px solid ${darkGray};
  border-radius: 15px;
  text-align: center;
  padding: 20px;

  select,
  input {
    margin: 10px 0;
    padding: 10px;
    width: calc(100% - 20px);
    border-radius: 5px;
    border: 1px solid ${darkGray};
    box-sizing: border-box;
    font-size: 14px;
  }

  button {
    margin-top: 20px;
    padding: 10px;
    background-color: ${champagnePink};
    color: ${white};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: ${dustyRose};
    }
  }
`;

const IndividualCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState(undefined);
  const [instructors, setInstructors] = useState([]);
  const [id, setId] = useState(null);
  const [courseName, setCourseName] = useState("Dummy Course");
  const [instructorData, setInstructorData] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [host, setHost] = useState("");

  const adminKey = localStorage.getItem("secret-key-admin");
  const userKey = localStorage.getItem("secret-key");

  useEffect(() => {
    if (adminKey) {
      const adminUserData = JSON.parse(adminKey);
      setCurrUser(adminUserData);
      setId(adminUserData._id);
    } else if (userKey) {
      navigate("/instructor");
    } else {
      navigate("/");
    }
  }, [navigate, adminKey, userKey]);

  const updateInstructorData = (instructor) => {
    const existingInstructor = instructorData.find(
      (i) => i === instructor.username
    );
    if (!existingInstructor) {
      setInstructorData((prevData) => [...prevData, instructor.username]);
    }
  };

  const getCourseNameById = async (courseId) => {
    try {
      const response = await axios.get(`${getCourseName}/${courseId}`);
      return response.data.courseName;
    } catch (error) {
      console.error("Error fetching course name:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        if (courseId) {
          setCourseName(await getCourseNameById(courseId));
        }
      } catch (error) {
        console.error("Error fetching course name:", error);
      }
    };
    fetchCourseName();
  }, [courseId]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        if (id) {
          const response = await axios.get(`${allInstructors}/${id}`);
          const fetchedInstructors = response.data;
          setInstructors(fetchedInstructors);
          fetchedInstructors.forEach(updateInstructorData);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };
    fetchInstructors();
  }, [id]);

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
    ],
  });

  const [lectureData, setLectureData] = useState({
    instructor: "",
    date: "",
    subject: "",
    lecture: "",
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

    const subject = courseName;

    const scheduleData = {
      course: subject,
      lecture: lectureData.lecture,
      date: lectureData.date,
      instructor: lectureData.instructor,
      location: lectureData.location,
    };

    console.log(scheduleData);

    setLectureData({
      instructor: "",
      date: "",
      subject: "",
      lecture: "",
      location: "",
    });
  };

  return (
    <Container>
      <TopBar>
        <Logout />
        <CourseName>{courseName}</CourseName>
        <Heading>Welcome admin</Heading>
      </TopBar>
      <ContentWrapper>
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
        <Form onSubmit={handleSubmit}>
          <h2>Schedule a Lecture</h2>
          <select
            name="instructor"
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Instructor
            </option>
            {instructorData.map((instructor, index) => (
              <option key={index} value={instructor}>
                {instructor}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={lectureData.date}
            onChange={handleChange}
            required
          />
          <select
            name="subject"
            value={lectureData.subject}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Subject
            </option>
            <option>{courseName}</option>
          </select>
          <input
            type="text"
            name="lecture"
            placeholder="Lecture"
            value={lectureData.lecture}
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
      </ContentWrapper>
    </Container>
  );
};

export default IndividualCourse;
