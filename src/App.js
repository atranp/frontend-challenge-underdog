import "./App.css";
import PokemonInfo from "./Components/PokemonInfo";
import PokemonCard from "./Components/PokemonCard";
import { useEffect, useState } from "react";
import { getData } from "./Services/api";
import PageControl from "./Components/PageControl";
import { useParams, useNavigate } from "react-router-dom";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokemonInfo, setPokemonInfo] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  console.log(params);

  useEffect(() => {
    if (currentUrl) {
      async function fetchData() {
        const response = await getData(currentUrl);
        setNextUrl(response.next);
        setPrevUrl(response.previous);

        await setSinglePokemonData(response.results);
      }

      fetchData();
    }
  }, [currentUrl]);

  // https://pokeapi.co/api/v2/pokemon?limit=25&offset=0
  // useNavigate
  useEffect(() => {
    const offset = params.page ? params.page * 25 : 0;
    setCurrentUrl(
      `https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`
    );
  }, [params.page]);

  const setSinglePokemonData = async (data) => {
    let pokemonDataList = await Promise.all(
      data.map(async (pokemon) => {
        let gatherPokeData = await getData(pokemon.url);
        return gatherPokeData;
      })
    );
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

  const handlePrevPage = () => {
    const prevPage = params.page ? +params.page : 0;

    navigate(`/${prevPage - 1}`, { replace: true });
  };

  async function handleNextPage(event) {
    const nextPage = params.page ? +params.page : 0;

    navigate(`/${nextPage + 1}`, { replace: true });
  }

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
