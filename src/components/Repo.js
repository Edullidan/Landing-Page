import { useParams } from "react-router-dom";

function Repo({ repositories }) {
  const { id } = useParams();

  const repository = repositories.find((repo) => repo.id === Number(id));

  let repositoriesName = "";

  if (repository) {
    repositoriesName = repository.name;
  }
  console.log(repositories);

  return (
    <div>
      <h2>Repository Details</h2>
      {repository && (
        <>
          <p>Repository ID: {id}</p>
          <p>Repository Name: {repositoriesName}</p>
          <p>Repository Description: {repository.description}</p>
        </>
      )}
    </div>
  );
}

export default Repo;
