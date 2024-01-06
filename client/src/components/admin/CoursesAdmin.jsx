import React, { useState } from "react";
import styled from "styled-components";
import { addCourse } from "../../utils/APIRoutes";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 50%;
    background-color: black;
    color: white;
    border: 1px solid transparent;
    border-radius: 15px;
    margin: 1rem;
    text-align: center;
    padding: 20px;
  }

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

export default function CoursesAdmin({ user }) {
  const [courseData, setCourseData] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to add the course
      const response = await axios.post(addCourse, { ...courseData });

      // Reset the form after successful submission
      setCourseData({
        name: "",
        level: "",
        description: "",
        image: "",
      });

      // You can also update the courses state if needed
      // Fetch updated courses data and set it to the state
      // const updatedCourses = await fetchCourses();
      // setCourses(updatedCourses);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h1>Add a Course</h1>
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={courseData.name}
          onChange={handleChange}
          required
        />
        <select
          name="level"
          value={courseData.level}
          onChange={handleChange}
          required
        >
          <option value="" disabled selected>
            Select Level
          </option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={courseData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={courseData.image}
          onChange={handleChange}
        />
        <button type="submit">Add Course</button>
      </form>
    </Container>
  );
}
