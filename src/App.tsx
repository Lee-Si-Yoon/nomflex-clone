import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Routes/Components/Header";

function App() {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Header></Header>
        <Routes>
          <Route path="/tv" element={<Tv></Tv>}></Route>
          <Route path="/search" element={<Search></Search>}></Route>
          <Route path="/*" element={<Home></Home>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
