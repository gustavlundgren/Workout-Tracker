import React from "react";
import styled from "styled-components";

function InfoCard({ title, info }) {
  return (
    <Container>
      <div className='card'>
        <h3>{title}</h3>
        <h5>⭐⭐⭐⭐</h5>
        <p>{info}</p>
      </div>
    </Container>
  );
}

export default InfoCard;

const Container = styled.div`
  .card {
    width: 25rem;
    height: 20rem;
    border-radius: 30px;
    background: #848484;
    box-shadow: 15px 15px 30px #3a3a3a, -15px -15px 30px #323232;
    padding: 1rem;
  }

  h5 {
    margin: 0;
  }

  h3 {
    margin-bottom: 0;
  }
`;
