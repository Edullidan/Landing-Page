import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDebounce from "./useDebounce";
import styled from "styled-components";

const StyledDiv = styled.div`
  justify-content: center;
  align-items: center;
  background-color: black;
`;
const StyledUl = styled.ul`
    background-color:#1d1e1e;
    margin-left: 700px;
   
    flex-direction:column
    box-shadow: 8px 8px 8px #ddd;
    border-radius:20px;
    margin-top:1rem;
    max-width: 350px;
    
`;

const StyledList = styled.li`
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

const StyledLink = styled(Link)`
  color: white;
`;
const StyledInput = styled.input`
  margin-left :760px


}
`;

const StyledButton = styled.button`
  border-radius: 5px;
`;

const StyledH1 = styled.h1`
  margin-left: 750px;
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
      <StyledH1>Repository search</StyledH1>
      <StyledInput
        type='text'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <StyledButton type='submit' onClick={handleSearch}>
        Search
      </StyledButton>
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
