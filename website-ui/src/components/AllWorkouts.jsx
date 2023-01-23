import React, { useEffect, useState } from "react";
import { default as axios } from "../api/index";
import useAuth from "../hooks/useAuth";

function AllWorkouts() {
  const { auth } = useAuth();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${auth.token}` },
    };

    const getAll = async () => {
      try {
        const res = await axios.get("api/exercises", config);

        console.log(res.data);
        setWorkouts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAll();
  }, []);
  return (
    <section>
      <ul>
        {workouts.map(function (e, eId) {
          {
            e && <p>No Workouts yet</p>;
          }
          return <li key={eId}>{e.name}</li>;
        })}
      </ul>
    </section>
  );
}

export default AllWorkouts;
