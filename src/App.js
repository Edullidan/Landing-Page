import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Repo from "./components/Repo";
import "./App.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Search
            repositories={repositories}
            setRepositories={setRepositories}
          />
        }
      ></Route>
      <Route
        path='/repo/:id'
        element={<Repo repositories={repositories} />}
      ></Route>
    </Routes>
  );
}

export default App;
