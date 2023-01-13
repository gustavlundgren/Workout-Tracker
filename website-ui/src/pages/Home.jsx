import React, { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";

export default function Home() {
  const [username, setUsername] = useState("");

  const currentUser = {
    username: "",
    email: "",
  };

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.user)
      .fetchById(localStorage.getItem("UserID"))
      .then((res) => {
        currentUser.username = res.data.username;
        currentUser.email = res.data.email;
        setUsername(res.data.username);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [username]);
  return <div>Welcome {username}!</div>;
}
