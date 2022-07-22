import React from "react";

const PokemonInfo = ({ pokemonInfo }) => {
  return (
    <div className="pokemonInfo">
      <img alt="" src={pokemonInfo.imageUrl} />
      <h1>{pokemonInfo.name}</h1>
      <div className="stats">
        {pokemonInfo.statHp && <p>HP: {pokemonInfo.statHp}</p>}
        {pokemonInfo.statAttack && <p>Attack: {pokemonInfo.statAttack}</p>}
        {pokemonInfo.statDefense && <p>Defense: {pokemonInfo.statDefense}</p>}
        {pokemonInfo.statSpecialAttack && (
          <p>Special Attack: {pokemonInfo.statSpecialAttack}</p>
        )}
        {pokemonInfo.statSpecialDefense && (
          <p>Special Defense: {pokemonInfo.statSpecialDefense}</p>
        )}
        {pokemonInfo.statSpeed && <p>Speed: {pokemonInfo.statSpeed}</p>}
        {pokemonInfo.types && (
          <p>
            Types:{" "}
            {pokemonInfo.types && pokemonInfo.types.map((item) => item + " ")}
          </p>
        )}
        {pokemonInfo.weight && (
          <p>
            Weight: {pokemonInfo.weight} {pokemonInfo.weight && "lbs"}
          </p>
        )}
      </div>
    </div>
  );
};

export default PokemonInfo;
