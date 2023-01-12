import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CiMail } from "react-icons/ci";
import { createAPIEndpoint, ENDPOINTS } from "../api";

export default function Signup() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [reTypedPassword, setReTypedPassword] = useState();

  const [usernameError, setUsernameError] = useState();
  const [EmailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const navigate = useNavigate();

  const validateSignup = () => {
    // kolla användarnamn
    // kolla mail
    // kolla så lösenord stämmer överrens
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      username: username,
      email: email,
      password: password,
    };

    // validera uppgifterna
    if (validateSignup()) {
      // kör hash sha256 på lösenordet

      // kalla på API för att skapa en ny användare till databasen
      createAPIEndpoint(ENDPOINTS.user)
        .post(values)
        .then((res) => {
          console.log(res);
          localStorage.setItem("currUser", `${res.data.id}`);
        })
        .catch((err) => console.log(err));
      // skicka användaren till appen
      navigate("/");
    }
  };

  return (
    <Container>
      <form
        className='flex column a-center'
        action='submit'
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1>Sign Up</h1>
        <p>Start your workout journey today!</p>
        <input
          type='text'
          placeholder='Username'
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <small></small>
        <input
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <CiMail />
        <small></small>
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <small></small>
        <input type='password' placeholder='Confirm Password' />
        <button>Sign up</button>
        <div className='login flex a-center j-center column'>
          <h3>Alredy a user?</h3>
          <a onClick={() => navigate("/login")}>Log in</a>
        </div>
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: coral;
  form {
    gap: 0.5rem;
    background-color: white;
    padding: 3.5rem;
    border-radius: 1rem;

    box-shadow: 10px 10px 25px -2px rgba(0, 0, 0, 0.62);
    -webkit-box-shadow: 10px 10px 25px -2px rgba(0, 0, 0, 0.62);
    -moz-box-shadow: 10px 10px 25px -2px rgba(0, 0, 0, 0.62);

    h1 {
      height: 1rem;
    }
    input {
      height: 2rem;
      width: 20rem;
      min-height: 1.5rem;
      max-height: 2rem;
      max-width: 20rem;
      min-width: 10rem;
      border-radius: 0.5rem;
      border: 1px solid grey;
      &:focus {
        outline: none;
      }
    }
    button {
      font-size: 1.5rem;
      background-color: mediumorchid;
      color: white;
      font-weight: bolder;
      border-radius: 0.5rem;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      &:hover {
        scale: 1.05;
      }
      &:active {
        scale: 1;
      }
    }
  }
  .login {
    background-color: white;
    opacity: 80%;
    h3 {
      height: 0.5rem;
    }
    a {
      text-decoration: none;
      color: mediumorchid;
      cursor: pointer;
      &:hover {
        scale: 1.05;
      }
    }
  }
`;
