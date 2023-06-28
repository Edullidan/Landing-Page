import { useParams } from "react-router-dom";
import { useState } from "react";

function Repo({ repositories }) {
  const { id } = useParams();

  console.log(repositories);

  return (
    <div>
      <h2>Repository Details</h2>
      <p>Repository ID: {repositories && id}</p>
      <p>Repository Name: {repositories.name}</p>
      <p>Repository Description: {repositories.description}</p>
    </div>
  );
}

export default Repo;
