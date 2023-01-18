import React, { useEffect, useState } from "react";
import { default as axios } from "../api/index";
import useAuth from "../hooks/useAuth";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Test() {
  const { auth } = useAuth();
  const [msg, setMsg] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    const getMsg = async () => {
      try {
        const res = await axios.get("api/user/admins", config);

        console.log(auth.token);
        console.log(res.data);
        setMsg(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMsg();
  }, []);
  return (
    <section>
      <AiOutlineArrowLeft className='back' onClick={() => navigate(-1)} />
      <h1>Profile Page</h1>
      <p>{msg}</p>
    </section>
  );
}

export default Test;
