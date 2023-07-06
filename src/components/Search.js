import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDebounce from "./useDebounce";
import styled from "styled-components";

const StyledDiv = styled.div`
  background: green;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 2px;
  border: 1px solid #ccc;
`;

const StyledButton = styled.button`
  padding: 2px;
  border: 1px solid #ccc;
`;

function Search({ repositories, setRepositories }) {
  const [search, setSearch] = useState("");
  const debounceSearchForm = useDebounce(search, 300);

  const handlePoisk = async () => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${search}`
    );
    const data = await response.json();
    console.log(data);
    setRepositories(data.items);
  };

  useEffect(() => {
    if (debounceSearchForm) {
      console.log(debounceSearchForm);
      handlePoisk();
    }
  }, [debounceSearchForm]);

  return (
    <StyledDiv>
      <h1>Repository search</h1>
      <StyledInput
        type='text'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></StyledInput>
      <StyledButton type='submit' onClick={handlePoisk}>
        Search
      </StyledButton>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <Link to={`/repo/${repo.id}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
    </StyledDiv>
  );
}

export default Search;
