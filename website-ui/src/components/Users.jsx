import { useState, useEffect } from "react";
import { ENDPOINTS, createAPIEndpoint } from "../api/index";
import useToken from "../hooks/useToken";

function Users() {
  const [users, setUsers] = useState();
  const refresh = useToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = () => {
      createAPIEndpoint(ENDPOINTS.getAllUsers)
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
      <button onClick={() => refresh()}>Refresh</button>
      <br />
    </article>
  );
}

export default Users;
