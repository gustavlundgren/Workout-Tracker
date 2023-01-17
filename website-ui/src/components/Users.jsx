import { useState, useEffect } from "react";
import { BASE_URL, ENDPOINTS, createAPIEndpoint } from "../api/index";

function Users() {
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = () => {
      createAPIEndpoint(ENDPOINTS.GetAccount)
        .fetchAllUsers(controller)
        .then((res) => {
          console.log(res.data);
          isMounted && setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}

export default Users;
