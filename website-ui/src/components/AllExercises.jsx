import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import axios from "axios";
import Card from "./Card";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

function AllExercises() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const config = {
      headers: { "X-Api-Key": "ob3BwfUmRDAucQZk1/wbmw==wHD501nTHRfoHqef" },
    };
    setLoading(true);
    const getExcersises = async (_offset) => {
      try {
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/exercises?offset=" + _offset,
          config
        );
        setExercises(response.data);
        console.log(exercises);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getExcersises(offset);
  }, [offset]);

  return (
    <Container className='flex j-center'>
      <HiArrowNarrowLeft className='back' onClick={() => navigate(-1)} />

      <SlArrowRight
        onClick={() => setOffset((o) => o + 10)}
        className='right'
      />
      <SlArrowLeft onClick={() => setOffset((o) => o - 10)} className='left' />

      {loading && <ClipLoader className='loader' color='#ffffff' size={70} />}
      {!loading && (
        <div className='grid'>
          {exercises.map(function (e) {
            return <Card data={e} />;
          })}
        </div>
      )}
    </Container>
  );
}

export default AllExercises;

const Container = styled.div`
  overflow-x: hidden;
  height: 100vh;
  width: 100vw;
  background-image: url("http://trumpwallpapers.com/wp-content/uploads/Workout-Wallpaper-03-1920-x-1080.jpg");
  background-size: cover;

  .right {
    right: 11%;
    bottom: 4%;
    cursor: pointer;
    &:hover {
      scale: 1.06;
    }
    &:active {
      scale: 1;
    }
  }

  .left {
    left: 7%;
    bottom: 4%;
    cursor: pointer;
    &:hover {
      scale: 1.06;
    }
    &:active {
      scale: 1;
    }
  }

  .loader {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 20rem);
    gap: 1rem;
    margin-top: 5rem;
  }
  svg {
    font-size: 2rem;
    color: white;
    position: absolute;
  }

  .back {
    left: 1%;
    top: 1%;
  }
`;
