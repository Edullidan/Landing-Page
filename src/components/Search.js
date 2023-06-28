import { useState } from "react";
import { Link } from "react-router-dom";

function Search({ repositories, setRepositories }) {
  const [search, setSearch] = useState("");

  const handlePoisk = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${search}`
    );
    const data = await response.json();
    console.log(data);
    setRepositories(data.items);
  };

  return (
    <div>
      <h1>Repository search</h1>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <button type='submit' onClick={handlePoisk}>
        Search
      </button>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <Link to={`/repo/${repo.id}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
