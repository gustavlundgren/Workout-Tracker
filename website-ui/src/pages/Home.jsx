import React, { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";

export default function Home() {
  const [user, setUser] = useState();

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.user)
      .fetchById(localStorage.getItem("currUser"))
      .then((res) => setUser(res.data.username))
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <p>Welcome {user}</p>
    </div>
  );
}
