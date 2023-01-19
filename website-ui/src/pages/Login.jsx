import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CiUser } from "react-icons/ci";
import { BiError } from "react-icons/bi";
import { BsKey } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import { default as axios } from "../api/index";

export default function Login() {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post("api/Login", {
        username: user,
        password: pwd,
      });

      console.log(JSON.stringify(response.data));

      const token = response?.data;
      setAuth({ user, pwd, token });
      localStorage.setItem("token", token);

      setUser("");
      setPwd("");

      navigate(from, { replace: true });
      setLoading(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid login details");
      } else {
        setErrMsg("Login Failed");
      }
      setLoading(false);
    }
  };

  return (
    <Container>
      <form className='flex column a-center' onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <p>Keep up the hard work!</p>

        <div className='flex row a-center'>
          <input
            type='text'
            ref={userRef}
            placeholder=' Username'
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            required
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            value={user}
          />
          <CiUser className={userFocus && "focus"} />
        </div>

        <div className='password flex row a-center'>
          <input
            type='password'
            placeholder=' Password'
            onChange={(e) => setPwd(e.target.value)}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            value={pwd}
          />
          <BsKey className={pwdFocus && "focus"} />
        </div>

        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
          <BiError />
          {errMsg}
        </p>
        {loading && <ClipLoader color='#ffffff' />}

        <button>Sign In</button>

        <div className='login flex a-center j-center column'>
          <h3>Need an account?</h3>
          <a onClick={() => navigate("/signup")}>Sign up</a>
        </div>
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: coral;
  background-image: url("https://img1.wsimg.com/isteam/stock/5l8g4dj");
  background-size: cover;

  .success-container {
    width: 30rem;
    height: 20rem;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 1rem;
    border-radius: 1rem;
    color: #ffffff;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    &:hover {
      scale: 1.05;
    }
  }
  .info {
    border: none;
    height: 1rem;
    width: 1rem;
    margin-right: 10px;
  }

  .errmsg {
    background-color: #faa0a0;
    //color: #8b0000;
    color: #800000;
    font-size: 1.3rem;
    font-weight: 1, 2;
    padding: 0.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 0.3rem;
    svg {
      height: 1.2rem;
      width: 1.2rem;
      border: none;
      margin-right: 5px;
    }
  }

  .offscreen {
    display: none;
  }

  form {
    gap: 0.5rem;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 3.5rem;
    border-radius: 1rem;
    color: white;

    box-shadow: 10px 10px 25px -2px rgba(0, 0, 0, 0.62);
    -webkit-box-shadow: 10px 10px 25px -2px rgba(0, 0, 0, 0.62);
    -moz-box-shadow: 10px 10px 25px -2px rgba(0, 0, 0, 0.62);

    svg {
      border: 1px solid white;
      border-left: none;
      height: 2rem;
      width: 2rem;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }

    .focus {
      background-color: rgba(255, 255, 255, 1);
      color: black;
    }

    h1 {
      height: 1rem;
    }
    input {
      height: 2rem;
      width: 20rem;
      border: 1px solid white;
      border-right: none;
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      background-color: transparent;
      color: #ffffff;
      &:focus {
        outline: none;
        background-color: rgba(255, 255, 255, 1);
        color: #000000;
      }
      padding: 0px;
    }
    button {
      font-size: 1.5rem;
      background-color: mediumorchid;
      color: white;
      font-weight: bolder;
      border-radius: 0.5rem;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      &:hover:enabled {
        scale: 1.05;
      }
      &:active:enabled {
        scale: 1;
      }
      &:disabled {
        opacity: 70%;
        cursor: default;
      }
    }
  }
  .login {
    h3 {
      height: 0.5rem;
    }
    a {
      color: mediumorchid;
    }
  }
`;
