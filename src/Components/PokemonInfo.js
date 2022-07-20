import React from "react";

const PokemonInfo = ({ pokemonInfo }) => {
  return (
    <div className="pokemonInfo">
      <img alt="" src={pokemonInfo.imageUrl} />
      <h1>{pokemonInfo.name}</h1>
      <div className="stats">
        <p>HP: {pokemonInfo.statHp}</p>
        <p>Attack: {pokemonInfo.statAttack}</p>
        <p>Defense: {pokemonInfo.statDefense}</p>
        <p>Special Attack: {pokemonInfo.statSpecialAttack}</p>
        <p>Special Defense: {pokemonInfo.statSpecialDefense}</p>
        <p>Speed: {pokemonInfo.statSpeed}</p>
        <p>
          Types:{" "}
          {pokemonInfo.types && pokemonInfo.types.map((item) => item + " ")}
        </p>
        <p>
          Weight: {pokemonInfo.weight} {pokemonInfo.weight && "lbs"}
        </p>
      </div>
    </div>
  );
};

export default PokemonInfo;
