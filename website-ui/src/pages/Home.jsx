import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NewWorkout from "../components/NewWorkout";
import styled from "styled-components";
import InfoCard from "../components/InfoCard";

export default function Home() {
  const ref = useRef(null);
  const date = new Date();

  const fakeReveiwOne =
    "I was in the market for a new fitness tracker and stumbled on a website that offered a free 6-month trial of their product. I was skeptical at first, but I decided to give it a try. I'm glad I did! I was able to log in from anywhere and start tracking my exercise. And the best part is that you can set up multiple pages you can track, like your sleep and food intake. The overall ease of use is top-notch.";

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const navigate = useNavigate();
  return (
    <Container className='no-scrollbar'>
      <Navbar scroll={handleClick} />
      <div className='title flex a-center j-center'>
        <h1>STRUCTURED WORKOUTS</h1>
      </div>

      <section className='info'>
        <InfoCard title={"So easy!"} info={fakeReveiwOne} />
        <InfoCard />
        <NewWorkout refer={ref} />
        <a onClick={() => navigate("/about")}>About</a>
        <p> Copyright &copy; {date.getFullYear()}</p>
      </section>
    </Container>
  );
}

const Container = styled.div`
  overflow-x: hidden;
  height: 100vh;
  background-image: url("https://assets-global.website-files.com/5ef8d3756b1a2073623cb2bd/5f538eea54692f4e249f610b_solution-gym.jpg");
  background-size: cover;

  a {
    cursor: pointer;
  }

  .title {
    width: 75%;
    height: fit-content;
    h1 {
      font-size: 10rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .info {
    width: 100vw;
    height: fit-content;
    background-color: rgb(0, 0, 0);
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -0%);
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    color: white;
  }
`;
