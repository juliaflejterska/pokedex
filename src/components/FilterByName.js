import { useState, useContext } from "react";
import Pokemon from "./Pokemon";
import { ThemeContext } from "../contexts/theme-context";
import { motion } from "framer-motion";

const FilterByName = () => {
  const [{ theme, isDarkTheme }, toggleTheme] = useContext(ThemeContext);

  const url = `https://pokeapi.co/api/v2/pokemon/`;

  const [filteredPokemon, setFilteredPokemon] = useState({});
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const fetchFilteredPokemon = async (enteredName) => {
    if (!enteredName || enteredName.trim() === "") {
      setIsError(true);
      window.alert("This field cannot be empty. Please enter valid name.");
      return;
    }
    setIsError(false);

    try {
      const enteredNameTrimmed = enteredName.trim().toLowerCase();

      const res = await fetch(`${url}${enteredNameTrimmed}`);

      if (!res.ok) {
        window.alert(`Pokemon not found.`);
        setIsError(true);
      }

      const data = await res.json();

      const formatedPokemon = {
        name: data.name,
        type: data.types[0].type.name,
        sprites: data.sprites.other.dream_world.front_default,
        weight: data.weight,
        height: data.height,
      };

      setFilteredPokemon(formatedPokemon);
    } catch (err) {
      setIsError(true);
      setErrMsg("Pokemon not found.");
      console.error(errMsg);
    }
  };

  const [enteredName, setEnteredName] = useState("");

  const [isSubmited, setIsSubmited] = useState(false);

  const handleChange = (e) => {
    setEnteredName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchFilteredPokemon(enteredName);

    setEnteredName("");

    setIsSubmited(true);
  };

  return (
    <div
      className="pokedex"
      style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1.3 }}
        transition={{
          duration: 0.5,
        }}
      >
        <img
          className="pokedex-logo"
          src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
          alt="pokedex logo"
        ></img>

        <input
          type="text"
          value={enteredName || ""}
          onChange={handleChange}
          placeholder="enter name"
        ></input>
        <button>SEARCH</button>
      </motion.form>

      {isSubmited && (
        <>
          {Object.keys(filteredPokemon).length !== 0 && (
            <div>
              <Pokemon
                name={filteredPokemon.name}
                type={filteredPokemon.type}
                sprites={filteredPokemon.sprites}
                weight={filteredPokemon.weight}
                height={filteredPokemon.height}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FilterByName;
