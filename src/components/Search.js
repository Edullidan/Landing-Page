import { useCallback, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import useDebounce from "./useDebounce";
import styled from "styled-components";

const StyledDiv = styled.div`
  justify-content: center;
  align-items: center;

  background-color: black;
  height: 100vh;
  margin: 0;
  padding: 0;
  border-radius: 10px;
`;
const StyledUl = styled.ul`
    background-color:#1d1e1e;
    margin-left: 727px;
    flex-direction:column
    box-shadow: 8px 8px 8px #ddd;
    border-radius:20px;
    margin-top: 0rem;
    max-width: 300px;
    
`;

const StyledList = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: black;
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
  border-radius: 4px;
`;

const StyledLink = styled(Link)`
  color: white;
`;
const StyledInput = styled.input`
border-radius: 10px 0px 0px 10px;  
background-color: #263238;
outline: none;
border: none;
color: white;
margin-left: 725px;
padding: 10px 20px;
width: 300px; 
font-size: 16px; 
  

}
`;

const StyledH1 = styled.h1`
  margin-left: 790px;
  color: white;
`;

const SearchButton = styled.button`
  border: none;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
  color: white;
  font-size: 16px;
  background-color: #504f4f;
  padding: 10px 20px;
`;

function Search({ repositories, setRepositories }) {
  const [search, setSearch] = useState("");
  const debounceSearchForm = useDebounce(search, 500);

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
      <SearchButton type='submit' onClick={handleSearch}>
        Search
      </SearchButton>
      <StyledUl>
        {repositories &&
          repositories.slice(0, 5).map((repo) => (
            <StyledList key={repo.id}>
              <StyledLink to={`/repo/${repo.id}`}>{repo.name}</StyledLink>
            </StyledList>
          ))}
      </StyledUl>
    </StyledDiv>
  );
}

export default Search;
