import React from "react";
import { sha256 } from "./auth";

export default function App() {
  return (
    <div>
      <h1>{sha256("Bobbo")}</h1>
      <p>Bobbo</p>
    </div>
  );
}
