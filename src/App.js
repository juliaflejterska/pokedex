import { useContext, useState, useEffect } from "react";
import "./App.css";
import FilterByName from "./components/FilterByName";
import FilterByType from "./components/FilterByType";
import Home from "./components/Home";
import Pokemons from "./components/Pokemons";
import { ThemeContext } from "./contexts/theme-context";
import Navigation from "./layout/Navigation";

function App() {
  return <Home />;
}

export default App;
