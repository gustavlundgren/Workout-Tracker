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
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getExcersises(offset);
  }, [offset]);

  return (
    <Container className='flex j-center a-center column'>
      <img src='http://trumpwallpapers.com/wp-content/uploads/Workout-Wallpaper-03-1920-x-1080.jpg' />
      <div className='top-bar'>
        <HiArrowNarrowLeft className='back' onClick={() => navigate(-1)} />
      </div>
      {loading && (
        <>
          <ClipLoader className='loader' color='#ffffff' size={70} />
          <div className='placeholder'></div>
        </>
      )}
      {!loading && (
        <>
          <div className='grid'>
            {exercises.map(function (e) {
              return <Card data={e} />;
            })}
          </div>
          <div className='controllers flex row'>
            <SlArrowLeft
              onClick={() => offset > 0 && setOffset((o) => o - 10)}
            />
            <SlArrowRight onClick={() => setOffset((o) => o + 10)} />
          </div>
        </>
      )}
    </Container>
  );
}

export default AllExercises;

const Container = styled.div`
  overflow-x: hidden;
  // background-image: url("http://trumpwallpapers.com/wp-content/uploads/Workout-Wallpaper-03-1920-x-1080.jpg");

  .placeholder {
    height: 700px;
    width: 100vw;
  }

  img {
    position: absolute;
    z-index: -1;
    width: 1920px;
    height: 1080px;
  }

  .controllers {
    margin-top: 3rem;
    width: 80%;
    justify-content: space-between;
    svg {
      color: white;
      cursor: pointer;
    }
  }

  .top-bar {
    display: flex;
    width: 100vw;
    height: 2rem;
    svg {
      margin: 1rem;
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
    grid-template-columns: repeat(5, 17rem);
    gap: 1rem;
    margin-top: 4rem;
  }
  svg {
    font-size: 2rem;
    color: white;
  }
`;
