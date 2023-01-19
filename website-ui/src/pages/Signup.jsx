import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CiMail, CiUser } from "react-icons/ci";
import { FaInfoCircle } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { BsKey } from "react-icons/bs";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { ClipLoader } from "react-spinners";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function Signup() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, email]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validera uppgifterna
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(pwd);

    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }

    setLoading(true);

    // kalla på API för att skapa en ny användare till databasen
    createAPIEndpoint(ENDPOINTS.register)
      .post({ username: user, email: email, password: pwd })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (!err?.response) {
          setErrMsg("No server response");
        } else if (err.response?.status === 409) {
          setErrMsg("Username taken");
        } else {
          setErrMsg("Registration failed");
        }
        setLoading(false);
      });

    // skicka användaren till appen
  };

  return (
    <section>
      {success ? (
        <Container className='flex column a-center j-center'>
          <div className='success-container'>
            <h2>Your account was successfully created!</h2>
            <a onClick={() => navigate("/login")}>Log in</a>
          </div>
        </Container>
      ) : (
        <Container>
          <form className='flex column a-center' onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <p>Start your workout journey today!</p>

            <div
              className={
                validName ? "flex row a-center" : "invalid flex row a-center"
              }
            >
              <input
                type='text'
                ref={userRef}
                placeholder=' Username'
                autoComplete='off'
                onChange={(e) => setUser(e.target.value)}
                required
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <CiUser className={userFocus && "focus"} />
            </div>

            <p
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FaInfoCircle className='info' />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letter, numbers, underscores, hyphens allowed.
            </p>

            <div className='email flex row a-center'>
              <input
                type='text'
                placeholder=' Email'
                onChange={(e) => setEmail(e.target.value)}
                required
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <CiMail className={emailFocus && "focus"} />
            </div>

            <p
              className={
                emailFocus && !validEmail ? "instructions" : "offscreen"
              }
            >
              <FaInfoCircle className='info' />
              Please enter a valid email adress.
            </p>

            <div className='password flex row a-center'>
              <input
                type='password'
                placeholder=' Password'
                onChange={(e) => setPwd(e.target.value)}
                required
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <BsKey className={pwdFocus && "focus"} />
            </div>

            <p className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FaInfoCircle className='info' />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters: !@#$%
            </p>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
              <BiError />
              {errMsg}
            </p>

            {loading && <ClipLoader color='#ffffff' />}

            <button
              disabled={!validName || !validEmail || !validPwd ? true : false}
            >
              Sign up
            </button>

            <div className='login flex a-center j-center column'>
              <h3>Alredy a user?</h3>
              <a onClick={() => navigate("/login")}>Sign in</a>
            </div>
          </form>
        </Container>
      )}
    </section>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("https://img1.wsimg.com/isteam/stock/5l8g4dj");
  background-size: cover;

  .success-container {
    width: 30rem;
    height: 20rem;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 1rem;
    border-radius: 1rem;
    color: #ffffff;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    &:hover {
      scale: 1.05;
    }
  }
  .info {
    border: none;
    height: 1rem;
    width: 1rem;
    margin-right: 10px;
  }

  .errmsg {
    background-color: #faa0a0;
    //color: #8b0000;
    color: #800000;
    font-size: 1.3rem;
    font-weight: 1, 2;
    padding: 0.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 0.3rem;
    svg {
      height: 1.2rem;
      width: 1.2rem;
      border: none;
      margin-right: 5px;
    }
  }

  .instructions {
    background-color: black;
    color: white;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    width: 20rem;
    height: fit-content;
    margin: 0;
  }

  .offscreen {
    display: none;
    // TODO - set to display offscreen
  }

  form {
    gap: 0.5rem;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 3.5rem;
    border-radius: 1rem;
    color: white;

    box-shadow: 10px 10px 25px -2px rgba(0, 0, 0, 0.62);
    -webkit-box-shadow: 10px 10px 25px -2px rgba(0, 0, 0, 0.62);
    -moz-box-shadow: 10px 10px 25px -2px rgba(0, 0, 0, 0.62);

    svg {
      border: 1px solid white;
      border-left: none;
      height: 2rem;
      width: 2rem;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }

    .focus {
      background-color: rgba(255, 255, 255, 1);
      color: black;
    }

    h1 {
      height: 1rem;
    }
    input {
      height: 2rem;
      width: 20rem;
      border: 1px solid white;
      border-right: none;
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      background-color: transparent;
      color: #ffffff;
      &:focus {
        outline: none;
        background-color: rgba(255, 255, 255, 1);
        color: #000000;
      }
      padding: 0px;
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
      &:hover:enabled {
        scale: 1.05;
      }
      &:active:enabled {
        scale: 1;
      }
      &:disabled {
        opacity: 70%;
        cursor: default;
      }
    }
  }
  .login {
    h3 {
      height: 0.5rem;
    }
    a {
      color: mediumorchid;
    }
  }
`;
