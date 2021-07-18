import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-center overflow-hidden">
      <div className="py-4">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="Pokemon"
        />
      </div>
    </nav>
  );
};

export default Navbar;
