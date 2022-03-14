import { useContext, useState, useEffect } from "react";
import FilterByName from "./FilterByName";
import FilterByType from "./FilterByType";
import Pokemons from "./Pokemons";
import Navigation from "../layout/Navigation";
import { ThemeContext } from "../contexts/theme-context";
import { animateScroll as scroll } from "react-scroll";

const Home = () => {
  const [{ theme, isDarkTheme }, toggleTheme] = useContext(ThemeContext);

  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [isFilterName, setIsFilterName] = useState(false);
  const [isFilterType, setIsFilterType] = useState(false);

  const fetchPokemons = async () => {
    setIsError(false);
    try {
      const res = await fetch(next);

      if (!res.ok) {
        window.alert(
          `Something went wrong and pokemon cannot be load. Please try refreshing the page.`
        );
        setIsError(true);
      }

      const data = await res.json();

      setNext(data.next);

      const fetchPokemonInfo = (pokemons) => {
        pokemons.forEach(async (pokemon) => {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );

          const data = await res.json();

          setPokemons((prevPokemons) => [...prevPokemons, data]);
        });
      };

      fetchPokemonInfo(data.results);
    } catch (err) {
      setIsError(true);
      setErrMsg("Pokemon cannot be load");
      console.error(errMsg);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const scrollToTop = () => {
    document.getElementById("app").scrollTo(0, 0);
  };

  const loadNext = () => {
    setIsFilterName(false);
    fetchPokemons();
  };

  const showFilteredByName = () => {
    setIsFilterType(false);
    setIsFilterName(!isFilterName);
  };

  const showFilteredByType = () => {
    scrollToTop();
    setIsFilterName(false);
    setIsFilterType(!isFilterType);
  };

  const goHome = () => {
    scrollToTop();
    setIsFilterName(false);
    setIsFilterType(false);
  };

  return (
    <>
      <Navigation
        goHome={goHome}
        loadNext={loadNext}
        showFilteredByName={showFilteredByName}
        showFilteredByType={showFilteredByType}
      />
      <div
        id="app"
        className="app"
        style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
      >
        {isFilterName && <FilterByName />}

        <FilterByType
          isFilterName={isFilterName}
          isFilterType={isFilterType}
          pokemons={pokemons}
        />

        {!isFilterName && !isFilterType && <Pokemons pokemons={pokemons} />}
      </div>
    </>
  );
};

export default Home;
