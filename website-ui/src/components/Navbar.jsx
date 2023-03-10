import React from "react";
import styled from "styled-components";
import { CgProfile, CgGym } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function Navbar({ scroll }) {
  const navigate = useNavigate();

  return (
    <Container>
      <CgGym className='logo' onClick={() => navigate("/")} />
      <button>
        <span onClick={() => scroll()} className='box'>
          create <br /> workout
        </span>
      </button>
      <button onClick={() => navigate("/workouts")}>
        <span className='box'>
          My <br /> workouts
        </span>
      </button>
      <button onClick={() => navigate("/explore")}>
        <span className='box'>
          Featured <br />
          Exercises
        </span>
      </button>
      <CgProfile className='profile' onClick={() => navigate("/profile")} />
    </Container>
  );
}

export default Navbar;

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.85);

  box-shadow: 1px 14px 31px -1px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 1px 14px 31px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 14px 31px -1px rgba(0, 0, 0, 0.75);

  svg {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 2rem;
    cursor: pointer;
    color: white;
    &:hover {
      scale: 1.06;
    }

    &:active {
      scale: 1;
    }
  }

  .profile {
    right: 1%;
  }

  .logo {
    left: 1%;
  }

  .box {
    width: 140px;
    height: auto;
    float: left;
    transition: 0.5s linear;
    position: relative;
    display: block;
    overflow: hidden;
    padding: 15px;
    text-align: center;
    margin: 0 5px;
    background: transparent;
    text-transform: uppercase;
    font-weight: 900;
  }

  .box:before {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    height: 4px;
    width: 100%;
    border-bottom: 4px solid transparent;
    border-left: 4px solid transparent;
    box-sizing: border-box;
    transform: translateX(100%);
  }

  .box:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    border-top: 4px solid transparent;
    border-right: 4px solid transparent;
    box-sizing: border-box;
    transform: translateX(-100%);
  }

  .box:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  }

  .box:hover:before {
    border-color: #ffffff;
    height: 100%;
    transform: translateX(0);
    transition: 0.3s transform linear, 0.3s height linear 0.3s;
  }

  .box:hover:after {
    border-color: #ffffff;
    height: 100%;
    transform: translateX(0);
    transition: 0.3s transform linear, 0.3s height linear 0.5s;
  }

  button {
    color: white;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    border: none;
    background: transparent;
  }
`;
