import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import useDebounce from "./useDebounce";
import styled from "styled-components";

const StyledDiv = styled.div`
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 300vh;
  margin: 0;
  padding: 0;
  border-radius: 10px;
`;
const StyledUl = styled.ul`
  background-color: #1d1e1e;
  margin-left: 50px;
  flex-direction: column;

  border-radius: 20px;
  margin-top: -150px;
  max-width: 300px;
  margin-right: 300px;
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

const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  border-radius: 10px 0px 0px 10px;
  background-color: #263238;
  outline: none;
  border: none;
  color: white;
  padding: 10px 20px;
  width: 300px;
  font-size: 16px;
  margin-top: -300px; /* Decrease the value to move it higher */
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
  margin-top: -300px;
`;

const StyledRa = styled.div`
  margin-top: 200px;
  margin-left: 50px;
  margin-bottom: 20px;
`;

const StyledSearch = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: black;
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
  border-radius: 4px;
`;

const StyledRepo = styled.ul`
  margin-top: -140px;
`;

function Search({ repositories, setRepositories }) {
  const [search, setSearch] = useState("");
  const [DebounceActive, setDebounceActive] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const debounceSearchForm = useDebounce(search, 1500);

  const handleDebounceSearch = useCallback(async () => {
    if (DebounceActive) {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${search}`
      );
      const data = await response.json();
      console.log(data);
      setRepositories(data.items);
    }
  }, [search, DebounceActive, setRepositories]);

  const handleSearch = useCallback(async () => {
    setDebounceActive(false);
    setShowResults(true);
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${search}`
    );
    const data = await response.json();
    console.log(data);
    setRepositories(data.items);
  }, [search, setRepositories]);

  useEffect(() => {
    if (debounceSearchForm) {
      handleDebounceSearch();
    }
  }, [debounceSearchForm, handleDebounceSearch]);

  return (
    <StyledDiv>
      <StyledH1>Repository search</StyledH1>
      <StyledRa>
        <StyledInputContainer>
          <StyledInput
            type='text'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(false);
            }}
          />
          <SearchButton type='submit' onClick={handleSearch}>
            Search
          </SearchButton>
        </StyledInputContainer>
      </StyledRa>
      <StyledRepo>
        {showResults &&
          repositories &&
          repositories.map((repo) => (
            <StyledSearch key={repo.id}>
              <StyledLink to={`/repo/${repo.id}`}>{repo.name}</StyledLink>
            </StyledSearch>
          ))}
      </StyledRepo>
      <StyledUl>
        {DebounceActive &&
          repositories &&
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
