import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";

export default function Home() {
  return (
    <Container className='no-scrollbar'>
      <Navbar />
    </Container>
  );
}

const Container = styled.div`
  overflow-x: hidden;
  height: 100vh;
  background-image: url("https://assets-global.website-files.com/5ef8d3756b1a2073623cb2bd/5f538eea54692f4e249f610b_solution-gym.jpg");
  background-size: cover;
`;
