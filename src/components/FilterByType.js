import { useState, useRef, useEffect } from "react";
import Pokemons from "./Pokemons";

const FilterByType = ({ pokemons, isFilterType, isFilterName }) => {
  const [typesArr, setTypesArr] = useState([]);

  const optionRef = useRef();

  const fetchFilteredPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/type`);

    const data = await res.json();

    const types = data.results;

    const pushArr = [];

    types.forEach((type) => {
      for (let key in type) {
        key === "name" && pushArr.push(type[key]);
      }
    });

    setTypesArr(...typesArr, pushArr);
  };

  useEffect(() => {
    fetchFilteredPokemon();
  }, []);

  const [selects, setSelects] = useState("all");

  const pokemonsFiltered = pokemons.filter(
    (pokemon) => pokemon.types[0].type.name === selects
  );

  return (
    <div>
      {isFilterType && (
        <div className="type-container">
          <select
            defaultValue={"all"}
            value={selects}
            onChange={(e) => setSelects(e.target.value)}
          >
            <option value={"all"}>all</option>
            {typesArr.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          {selects === "all" && <Pokemons pokemons={pokemons} />}
          {selects !== "all" && (
            <Pokemons
              pokemons={pokemonsFiltered}
              msg="No pokemon of the selected type were found. Try loading more. "
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FilterByType;
