import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDebounce from "./useDebounce";
import styled from "styled-components";

const StyledDiv = styled.div`
  justify-content: center;
  align-items: center;
`;
const StyledUl = styled.ul`
  padding: 0;
`;

const StyledList = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  border: 1px solid black;
  padding: 10px;
  background-color: #195135;
  color: white;
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  color: white;
`;

function Search({ repositories, setRepositories }) {
  const [search, setSearch] = useState("");
  const debounceSearchForm = useDebounce(search, 300);

  const handleSearch = useCallback(async () => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${search}`
    );
    const data = await response.json();
    console.log(data);
    setRepositories(data.items);
  }, [search, setRepositories]);

  useEffect(() => {
    if (debounceSearchForm) {
      handleSearch();
    }
  }, [debounceSearchForm, handleSearch]);

  return (
    <StyledDiv>
      <h1>Repository search</h1>
      <input
        type='text'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button type='submit' onClick={handleSearch}>
        Search
      </button>
      <StyledUl>
        {repositories &&
          repositories.map((repo) => (
            <StyledList key={repo.id}>
              <StyledLink to={`/repo/${repo.id}`}>{repo.name}</StyledLink>
            </StyledList>
          ))}
      </StyledUl>
    </StyledDiv>
  );
}

export default Search;
