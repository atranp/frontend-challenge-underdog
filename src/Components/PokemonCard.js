import React from "react";

const PokemonCard = ({ pokemon, setInfo }) => {
  return (
    <div className="container">
      <div className="pokemonCard">
        {pokemon.map((pokemon) => (
          <div
            className="card"
            onClick={(e) => setInfo(pokemon)}
            key={pokemon.id}
          >
            <h2>{pokemon.id}</h2>
            <img
              alt="frontview of pokemon"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            />
            <h2>{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
