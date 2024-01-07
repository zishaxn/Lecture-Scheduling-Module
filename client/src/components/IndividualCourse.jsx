import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getSchedule,
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
const pearlGray = "#d3d3d3";
const dustyRose = "#d2b48c";
const silverMist = "#c0c0c0";
const champagnePink = "#fad6a5";
const platinumFrost = "#c0c0c0";
const turquoiseBlue = "#40e0d0";
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* You can experiment with different values */
  align-items: flex-start; /* Added align-items property */
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-bottom: 20px;
  padding: 20px;
  width: calc(45% - 20px); /* Adjusted width calculation to include margin */
  box-sizing: border-box;
  transition: transform 0.2s ease-in-out;
  overflow: hidden;

  &:hover {
    transform: scale(1.06);
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

const Form = styled.form`
  width: 45%;
  background-color: ${sageGreen};
  color: ${darkGray};
  border: 1px solid transparent;
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
  // const [currUser, setCurrUser] = useState(undefined);
  const [instructors, setInstructors] = useState([]);
  const [dropDropUser, setDropUser] = useState(undefined);
  const [id, setId] = useState(null);
  const [courseName, setCourseName] = useState("Dummy Course");
  const [instructorData, setInstructorData] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [schedule,setSchedule]=useState([])

  const adminKey = localStorage.getItem("secret-key-admin");
  const userKey = localStorage.getItem("secret-key");

  useEffect(() => {
    if (adminKey) {
      const adminUserData = JSON.parse(adminKey);
      // setCurrUser(adminUserData);
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

  const [lectureData, setLectureData] = useState({
    instructor: "",
    date: "",
    subject: "", // Set to the first subject by default
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

  const handleInstructorSelection = (e) => {
    const selectedInstructor = e.target.value;
    setDropUser(selectedInstructor);
    setSelectedInstructor(selectedInstructor); // Assuming you also want to update the selected instructor for other purposes
  };

  useEffect(() => {
  }, [setDropUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming the subject is the courseName
    const subject = courseName;

    const scheduleData = {
      course: subject,
      lecture: lectureData.lecture,
      date: lectureData.date,
      instructor: dropDropUser,
      location: lectureData.location,
    };
    try {
      const response = await axios.post(updateSchedule, scheduleData);
      console.log("Schedule updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating schedule:", error);
    }

    setLectureData({
      instructor: "",
      date: "",
      subject: "", // Set to the first subject by default
      lecture: "",
      location: "",
    });
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(getSchedule, {
          params: { courseName },
        });
        setSchedule(response.data.schedules);
      } catch (error) {
        console.error("Error fetching Schedule:", error);
      }
    };

    // Run the effect on component mount and whenever there's a change in schedule or courseName
    fetchSchedules();
  }, [courseName,dropDropUser,handleSubmit]); 

  return (
    <Container>
      <TopBar>
        <Logout />
        <CourseName>{courseName}</CourseName>
        <Heading>Welcome admin</Heading>
      </TopBar>
      <ContentWrapper>
        <CardList>
          {schedule.map((scheduleItem, index) => (
            <Card key={index}>
              <div className="card-content">
                <h2>Lecture: {scheduleItem.lecture}</h2>
                <p>Instructor: {scheduleItem.instructor}</p>
                <p>Date: {new Date(scheduleItem.date).toLocaleDateString()}</p>
                <p>Location: {scheduleItem.location}</p>
              </div>
            </Card>
          ))}
        </CardList>

        <Form onSubmit={handleSubmit}>
          <h2>Schedule a Lecture</h2>
          <select
            name="instructor"
            value={selectedInstructor}
            onChange={handleInstructorSelection}
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
