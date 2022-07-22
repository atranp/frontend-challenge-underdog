import "./App.css";
import PokemonInfo from "./Components/PokemonInfo";
import PokemonCard from "./Components/PokemonCard";
import { useEffect, useState } from "react";
import { getData } from "./Services/api";
import PageControl from "./Components/PageControl";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"
  );
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokemonInfo, setPokemonInfo] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await getData(currentUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);

      await setSinglePokemonData(response.results);
    }
    fetchData();
  }, [currentUrl]);

  const setSinglePokemonData = async (data) => {
    let pokemonDataList = await Promise.all(
      data.map(async (pokemon) => {
        let gatherPokeData = await getData(pokemon.url);
        return gatherPokeData;
      })
    );
    console.log(pokemonDataList);
    setPokemonData(pokemonDataList);
  };

  const handleSetPokemonInfo = (pokemon) => {
    setPokemonInfo({
      name: pokemon.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`,
      statHp: pokemon.stats[0].base_stat,
      statAttack: pokemon.stats[1].base_stat,
      statDefense: pokemon.stats[2].base_stat,
      statSpecialAttack: pokemon.stats[3].base_stat,
      statSpecialDefense: pokemon.stats[4].base_stat,
      statSpeed: pokemon.stats[5].base_stat,
      types: pokemon.types.map((item) => item.type.name),
      weight: pokemon.weight,
    });
  };

  const handleNextPage = () => {
    setCurrentUrl(nextUrl);
  };

  const handlePrevPage = () => {
    setCurrentUrl(prevUrl);
  };

  return (
    <div className="App">
      <div className="left-content">
        <PokemonCard
          pokemon={pokemonData}
          setInfo={(pokemon) => handleSetPokemonInfo(pokemon)}
        />
        <PageControl
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          prevUrl={prevUrl}
          nextUrl={nextUrl}
        />
      </div>
      <div className="right-content">
        <PokemonInfo pokemonInfo={pokemonInfo} />
      </div>
    </div>
  );
}

export default App;
