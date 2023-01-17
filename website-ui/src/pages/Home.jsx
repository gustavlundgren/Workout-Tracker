import React, { useEffect, useState } from "react";
import Users from "../components/Users";
import { ClipLoader } from "react-spinners";

export default function Home() {
  return (
    <div>
      <h1>Välkommen!</h1>
      <br />
      <Users />
    </div>
  );
}
