import { useParams } from "react-router-dom";
import styled from "styled-components";

function Repo({ repositories }) {
  const StyledR = styled.h3`
    padding: 10px;
    background-color: #0c496b;
    color: white;
    margin-bottom: 10px;
    width: 500px;
    border-radius: 20px;
  `;

  const StyledTitle = styled.h2`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 10px;
    background-color: #0c496b;
    color: white;
    margin-bottom: 10px;
    width: 200px;
    height: 50px;
    border-radius: 20px;
  `;

  const { id } = useParams();

  const repository = repositories.find((repo) => repo.id === Number(id));

  let repositoriesName = "";

  if (repository) {
    repositoriesName = repository.name;
  }
  console.log(repositories);

  return (
    <div>
      <StyledTitle>Repository Details</StyledTitle>
      {repository && (
        <StyledR>
          <p>Repository ID: {id}</p>
          <p>Repository Name: {repositoriesName}</p>
          <p>Repository Description: {repository.description}</p>
        </StyledR>
      )}
    </div>
  );
}

export default Repo;
