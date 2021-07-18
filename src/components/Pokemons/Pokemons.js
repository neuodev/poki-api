import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10"
  );
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  useEffect(() => {
    try {
      async function fetch() {
        setLoading(true);
        const { data } = await axios.get(currentPage);
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
        setNextPage(data.next);
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
  }, [currentPage]);

  const getNextPage = () => {
    setPrevPage(currentPage);
    setCurrentPage(nextPage);
  };

  const getPrevPage = () => {
    setCurrentPage(prevPage);
    setPrevPage(null);
  };

  return (
    <div>
      {loading ? (
        <h1 className="text-center mt-4">Loading</h1>
      ) : error ? (
        <h1 className="text-red-500 mt-4 text-center">{error}</h1>
      ) : (
        <div className="mx-4 grid  grid-cols-12 gap-4 mt-4">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}

      <div className="w-full my-10 flex items-center justify-center">
        <button
          className={`px-3 py-2 mr-2 rounded-md shadow-md ${
            prevPage ? "bg-blue-200 text-blue-500" : "text-gray-300 bg-gray-200"
          }`}
          onClick={getPrevPage}
        >
          Prev
        </button>
        <button
          className={`px-3 py-2 mr-2 rounded-md shadow-md ${
            nextPage ? "bg-blue-200 text-blue-500" : "text-gray-300 bg-gray-200"
          }`}
          onClick={getNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pokemons;
