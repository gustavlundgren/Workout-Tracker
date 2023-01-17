import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function CurrentWorkouts() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  return (
    <div>
      <h1>Create New</h1>
      <button onClick={() => navigate("/new-workout")}>New</button>
    </div>
  );
}

export default CurrentWorkouts;
