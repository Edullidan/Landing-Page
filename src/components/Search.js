import { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  const [repositories, setRepositories] = useState([]);

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
      <form onSubmit={handlePoisk}>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button type='submit'>Search</button>
      </form>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
