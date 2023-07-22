import { useParams } from "react-router-dom";
import styled from "styled-components";

function Repo({ repositories }) {
  const StyledR = styled.h3`
    padding: 10px;
    background: linear-gradient(134deg, #2e2152, #fad6a6);
    color: white;
    border: 1px solid black;
    margin-bottom: 10px;
    width: 500px;
    border-radius: 20px;
  `;

  const StyledTitle = styled.h2`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 10px;
    background: linear-gradient(134deg, #2e2152, #fad6a6);
    color: white;
    margin-bottom: 10px;
    width: 200px;
    height: 50px;
    border-radius: 20px;
  `;

  const StyledDiv = styled.div`
    justify-content: center;
    align-items: center;
    border-top: 1px solid transparent;
    padding-bottom: 0px;
    box-shadow: none;
    display: block !important;
    z-index: auto;
    position: static;
    background: linear-gradient(120deg, #2e1222, #53353d);
    height: 500vh;
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    opacity: 1;
  `;

  const { id } = useParams();

  const repository = repositories.find((repo) => repo.id === Number(id));

  let repositoriesName = "";

  if (repository) {
    repositoriesName = repository.name;
  }
  console.log(repositories);

  return (
    <StyledDiv>
      <StyledTitle>Repository Details</StyledTitle>
      {repository && (
        <StyledR>
          <p>Repository ID: {id}</p>
          <p>Repository Name: {repositoriesName}</p>
          <p>Repository Description: {repository.description}</p>
        </StyledR>
      )}
    </StyledDiv>
  );
}

export default Repo;
