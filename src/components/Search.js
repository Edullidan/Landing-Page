import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDebounce from "./useDebounce";
import styled from "styled-components";

const StyledDiv = styled.div`
  justify-content: center;
  align-items: center;
`;

const StyledList = styled.ul`
  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid black;
  background-color: #195135;
  justify-content: space-between;
  align-items: flex-end;
  letter-spacing: 0.15px;
`;

const StyledInput = styled.input`
  display: block;
  font-size: 1.1rem;
  background-color: #3b3b4f;
  color: white;
  padding: 5px;
  border: none;
`;

const StyledButton = styled.button`
  padding: 2px;
  border: 1px solid #ccc;
  background-color: #195135;
  color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: black;
`;

function Search({ repositories, setRepositories }) {
  const [search, setSearch] = useState("");
  const debounceSearchForm = useDebounce(search, 300);

  const handlePoisk = useCallback(async () => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${search}`
    );
    const data = await response.json();
    console.log(data);
    setRepositories(data.items);
  }, [search, setRepositories]);

  useEffect(() => {
    if (debounceSearchForm) {
      handlePoisk();
    }
  }, [debounceSearchForm, handlePoisk]);

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
      <StyledList>
        {repositories &&
          repositories.map((repo) => (
            <li key={repo.id}>
              <StyledLink to={`/repo/${repo.id}`}>{repo.name}</StyledLink>
            </li>
          ))}
      </StyledList>
    </StyledDiv>
  );
}

export default Search;
