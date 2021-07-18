import React from "react";

const PokemonCard = ({ pokemon }) => {
  const { name, abilities, base_experience } = pokemon;
  return (
    <div className="w-full h-32 border shadow-lg mb-4 rounded-lg col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 overflow-hidden cursor-pointer transform translate-y-0 transition-transform duration-300 hover:-translate-y-3">
      <div className="bg-yellow-100 h-16 px-4 text-yellow-500 flex justify-between items-center">
        <p className="font-semibold text-lg capitalize   ">{name}</p>
        <span className="inline-block bg-yellow-400 rounded-full py-1 px-2 text-xs font-semibold shadow-lg">
          {base_experience}
        </span>
      </div>
      <div className="p-4 bg-red-100 h-16 px-3 flex items-center justify-start">
        <p className="mr-2 text-gray-500">Abilities:</p>
        <ul className="flex items-center justify-center truncate">
          {abilities.map((abilities, idx) => {
            if (idx < 2) {
              return (
                <li
                  className="mr-2 text-red-300 font-semibold bg-red-200 px-2 rounded-lg"
                  key={idx}
                >
                  {abilities.ability.name}
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;
