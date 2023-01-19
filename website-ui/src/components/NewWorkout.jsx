import React from "react";
import styled from "styled-components";

function NewWorkout({ refer }) {
  return (
    <Container>
      <section className='new flex column a-center j-center'>
        <h1>Create New</h1>
        <div className='form__group field'>
          <input
            required=''
            placeholder='Name'
            className='form__field'
            type='input'
          />
          <label className='form__label' htmlFor='name' ref={refer}>
            Workout Name
          </label>
        </div>
        <button>Create</button>
      </section>
    </Container>
  );
}

export default NewWorkout;

const Container = styled.div`
  color: #fff;
  .form__group {
    position: relative;
    padding: 20px 0 0;
    margin-top: 10px;
    width: 100%;
    max-width: 180px;
  }

  .form__field {
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 17px;
    color: #fff;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
  }

  .form__field::placeholder {
    color: transparent;
  }

  .form__field:placeholder-shown ~ .form__label {
    font-size: 17px;
    cursor: text;
    top: 20px;
  }

  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #9b9b9b;
    pointer-events: none;
  }

  .form__field:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #116399, #38caef);
    border-image-slice: 1;
  }

  .form__field:focus ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #38caef;
    font-weight: 700;
  }

  /* reset input */
  .form__field:required,
  .form__field:invalid {
    box-shadow: none;
  }
`;
