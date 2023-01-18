import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Test from "../components/Test";
import styled from "styled-components";

export default function Home() {
  function refreshPage() {
    window.location.reload();
  }
  return (
    <Container>
      <Navbar />
      <button className='logout' onClick={() => refreshPage()}>
        <span></span>
        <span></span>
        <span></span>
        <span></span> Log out
      </button>
    </Container>
  );
}

const Container = styled.div`
  .logout {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1em 1.8em;
    outline: none;
    border: 1px solid #303030;
    background: #212121;
    color: #ae00ff;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 15px;
    overflow: hidden;
    transition: 0.2s;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
  }

  .logout:hover {
    box-shadow: 0 0 10px #ae00ff, 0 0 25px #001eff, 0 0 50px #ae00ff;
    transition-delay: 0.6s;
  }

  .logout span {
    position: absolute;
  }

  .logout span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ae00ff);
  }

  .logout:hover span:nth-child(1) {
    left: 100%;
    transition: 0.7s;
  }

  .logout span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #001eff);
  }

  .logout:hover span:nth-child(3) {
    right: 100%;
    transition: 0.7s;
    transition-delay: 0.35s;
  }

  .logout span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #ae00ff);
  }

  .logout:hover span:nth-child(2) {
    top: 100%;
    transition: 0.7s;
    transition-delay: 0.17s;
  }

  .logout span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #001eff);
  }

  .logout:hover span:nth-child(4) {
    bottom: 100%;
    transition: 0.7s;
    transition-delay: 0.52s;
  }

  .logout:active {
    background: #ae00af;
    background: linear-gradient(to top right, #ae00af, #001eff);
    color: #bfbfbf;
    box-shadow: 0 0 8px #ae00ff, 0 0 8px #001eff, 0 0 8px #ae00ff;
    transition: 0.1s;
  }

  .logout:active
    span:nth-child(1)
    span:nth-child(2)
    span:nth-child(2)
    span:nth-child(2) {
    transition: none;
    transition-delay: none;
  }
`;
