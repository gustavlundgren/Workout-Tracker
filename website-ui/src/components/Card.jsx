import React from "react";
import styled from "styled-components";

function Card({ data }) {
  return (
    <Container>
      <div className='card'>
        <div className='card-details'>
          <p className='text-title'>{data.name}</p>
          <p className='text-body'>
            Muscle: {data.muscle} <br />
            Difficulty: {data.difficulty} <br />
            Equipment: {data.equipment}
          </p>
        </div>
        <button className='card-button'>More info</button>
      </div>
    </Container>
  );
}

export default Card;

const Container = styled.div`
  color: white;

  .card {
    width: 190px;
    height: 254px;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.75);
    position: relative;
    padding: 1.8rem;
    border: 2px solid #4d4d4d;
    transition: 0.5s ease-out;
    overflow: visible;
  }

  .card-details {
    color: white;
    height: 100%;
    gap: 0.5em;
    display: grid;
    place-content: center;
  }

  .card-button {
    transform: translate(-50%, 125%);
    width: 60%;
    border-radius: 1rem;
    border: none;
    background-color: #fff;
    color: #000;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    opacity: 0;
    transition: 0.3s ease-out;
    cursor: pointer;
  }

  .text-body {
    color: rgb(194, 194, 194);
  }

  /*Text*/
  .text-title {
    font-size: 1.5em;
    font-weight: bold;
  }

  /*Hover*/
  .card:hover {
    border-color: #fff;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }

  .card:hover .card-button {
    transform: translate(-50%, 50%);
    opacity: 1;
  }
`;
