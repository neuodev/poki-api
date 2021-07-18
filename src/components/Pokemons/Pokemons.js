import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

// add pagination , items perpage, and card
const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      async function fetch() {
        setLoading(true);
        const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/");
        // populate the data
        /*
              The data return from the api only include the name and the url to get the data for each pokemon 
              We will loop on this data to get the details for each pokemon
            */
        console.log(data);
        let allPokemons = [];
        for (const pokemon of data.results) {
          let { data: pokemonDetails } = await axios.get(pokemon.url);
          allPokemons.push(pokemonDetails);
        }

        setLoading(false);
        setPokemons(allPokemons);
      }

      fetch();
    } catch (error) {
      setError(error.message);
    }

    return () => {
      setError(null);
      setLoading(false);
      setPokemons([]);
    };
  }, []);
  return (
    <div>
      <div className="mx-4 grid  grid-cols-12 gap-4 mt-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Pokemons;
