import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  // it checks if local storage has an item named as 'secret key', if  it is then it means user is authenticated and then it redirects it to the page after login/signup
  useEffect(() => {
    if (localStorage.getItem("secret-key-admin")) {
      navigate("/admin");
    } else if (localStorage.getItem("secret-key")) {
      navigate("/instructor");
    }
  }, []);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  // setting properties for toast notifications
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  /*
  here we have extensively used toast
  (temporary messages that do not require user interaction and automatically disappear after a certain duration.)---> react-toastify library
  */
  const handleValidation = () => {
    // we are destrcuturing the values (destructure and store them)
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  // async , await function, indicating that it contains asynchronous operations.
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      console.log("lol");
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        isAdmin: values.isAdmin, // Include the isAdmin field
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        /* The localStorage.setItem method takes two parameters:
        first is the key and the second is value, here we have converted
        the user data recieved into a json format and used it as the key for local storage*/
        if (data.user.isAdmin === true) {
          localStorage.setItem("secret-key-admin", JSON.stringify(data.user));
          navigate("/admin");
        } else if (data.user.isAdmin === false) {
          localStorage.setItem("secret-key", JSON.stringify(data.user));
          navigate("/instructor");
        }
      }
    }
  };

  // The handleChange function is designed to handle changes in the form input fields. As the user types into each input field, the handleChange function is triggered, updating the state (values) with the new values.
  // first it identifies which input field is edited and then it looks for the value or extracts the value that is updated and then set t or updates it using setValues.
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    // If the input is a checkbox, use the 'checked' property
    const newValue = type === "checkbox" ? checked : value;

    setValues({ ...values, [name]: newValue });
  };

  return (
    <>
      <FormContainer action="" onSubmit={(event) => handleSubmit(event)}>
        <form action="">
          <div className="brand">
            <h1>Course Schedule</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={values.isAdmin}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="isAdmin">Admin</label>
          </div>
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-size: 1rem;

    input {
      appearance: none;
      width: 1.5rem;
      height: 1.5rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.2rem;
      outline: none;
      margin-right: 0.5rem;
      cursor: pointer;
      position: relative;

      &:checked {
        background-color: #4e0eff;
        border-color: #4e0eff;

        &:before {
          content: "\u2713"; // Unicode character for a checkmark
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 1.2rem;
        }
      }
    }

    label {
      cursor: pointer;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
