import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

const ITEMS_PER_PAGE = [5, 10, 15, 20];
const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE[1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  useEffect(() => {
    try {
      async function fetch() {
        setLoading(true);
        const offset = (currentPage - 1) * itemsPerPage;
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${itemsPerPage}`
        );
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
        setLastPage(Math.floor(data.count / itemsPerPage));
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
  }, [currentPage, itemsPerPage]);

  const getNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getPrevPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  };

  const getLastPage = () => {
    setCurrentPage(lastPage);
  };
  return (
    <div>
      <div className="flex items-center justify-center bg-yellow-100 py-3">
        <div className="flex items-center justify-center flex-col bg-yellow-200 p-4 rounded-md w-72 shadow-lg ">
          <p className="text-yellow-400 mb-2">Items</p>
          <ul className="flex items-center justify-between w-full">
            {ITEMS_PER_PAGE.map((item) => (
              <li
                className="bg-yellow-200 px-3 py-1 rounded-lg shadow-inner cursor-pointer"
                key={item}
                onClick={() => {
                  setItemsPerPage(item);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
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
            currentPage !== 1
              ? "bg-blue-200 text-blue-500"
              : "text-gray-300 bg-gray-200"
          }`}
          onClick={() => {
            setCurrentPage(1);
          }}
          disabled={currentPage === 1}
        >
          First Page
        </button>
        <button
          className={`px-3 py-2 mr-2 rounded-md shadow-md ${
            currentPage !== 1
              ? "bg-blue-200 text-blue-500"
              : "text-gray-300 bg-gray-200"
          }`}
          onClick={getPrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className={`px-3 py-2 mr-2 rounded-md shadow-md ${
            currentPage !== lastPage
              ? "bg-blue-200 text-blue-500"
              : "text-gray-300 bg-gray-200"
          }`}
          onClick={getNextPage}
          disabled={currentPage === lastPage}
        >
          Next
        </button>
        <button
          className={`px-3 py-2 mr-2 rounded-md shadow-md ${
            currentPage !== lastPage
              ? "bg-blue-200 text-blue-500"
              : "text-gray-300 bg-gray-200"
          }`}
          onClick={getLastPage}
          disabled={currentPage === lastPage}
        >
          Last Page
        </button>
      </div>
    </div>
  );
};

export default Pokemons;
