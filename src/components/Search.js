import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import useDebounce from "./useDebounce";
import styled from "styled-components";

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
const StyledUl = styled.ul`
  background: linear-gradient(134deg, #2e2152, #fad6a6);
  margin-left: 50px;
  font-size: 17px;
  flex-direction: column;
  margin-left: 13px;
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
  background: linear-gradient(134deg, #2e2152, #fad6a6);
  outline: none;
  border: 1px solid #009ee2;
  border-radius: 10px 0px 0px 10px;
  color: white;
  padding: 10px 20px;
  width: 300px;
  font-size: 16px;
  margin-top: -300px;
  margin-left: -40px;
`;

const StyledH1 = styled.h1`
  color: white;
  border-top: 1px solid transparent;
  background: linear-gradient(134deg, #2e2152, #53353d);
  margin-top: -5px;
  box-shadow: none;
  display: block !important;
  z-index: auto;
  padding-bottom: 10px;
`;

const SearchButton = styled.button`
  border-radius: 0px 10px 10px 0px;

  border: 0px;
  background: linear-gradient(134deg, #2e2152, #13e2da);
  cursor: pointer;
  font-size: 16px;
  padding: 11px 20px;
  margin-top: -300px;
`;

/*padding: 10px 20px;
  margin-top: -300px;*/
const StyledRa = styled.div`
  margin-top: 200px;
  margin-left: 50px;
  margin-bottom: 20px;
`;

const StyledSearch = styled.li`
  flex-direction: column;
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  border: 1px solid #009ee2;
  padding: 10px;
  background: linear-gradient(134deg, #2e2152, #fad6a6);
  color: white;
  margin-bottom: 10px;

  margin-left: -40px;
  height: 50px;
  border-radius: 4px;
`;

const StyledRepo = styled.ul`
  margin-left: 50px;
  font-size: 17px;
  flex-direction: column;
  margin-left: 13px;
  border-radius: 20px;
  margin-top: -125px;
  max-width: 300px;
  margin-right: 300px;
`;

function Search({ repositories, setRepositories }) {
  const [search, setSearch] = useState("");
  const [DebounceActive, setDebounceActive] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const debounceSearchForm = useDebounce(search, 20);

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
