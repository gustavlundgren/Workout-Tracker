import React from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <Container>
      <button>
        <span class='box'>Hover!</span>
      </button>
      <button>
        <span class='box'>Hover!</span>
      </button>
      <button>
        <span class='box'>Hover!</span>
      </button>
      <CgProfile onClick={() => navigate("/profile")} />
    </Container>
  );
}

export default Navbar;

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;

  svg {
    position: absolute;
    right: 1%;
    top: 1%;
    font-size: 2rem;
    cursor: pointer;
    &:hover {
      scale: 1.06;
    }

    &:active {
      scale: 1;
    }
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
    border-color: #262626;
    height: 100%;
    transform: translateX(0);
    transition: 0.3s transform linear, 0.3s height linear 0.3s;
  }

  .box:hover:after {
    border-color: #262626;
    height: 100%;
    transform: translateX(0);
    transition: 0.3s transform linear, 0.3s height linear 0.5s;
  }

  button {
    color: black;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    border: none;
    background: transparent;
  }
`;
