import { useEffect, useState } from 'react';
import './App.css';
import PokemonList from './PokemonList';


function App() {
 const [pokemon, setPokemon] = useState([]);
 const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')

 console.log(pokemon)


  const getAllPokemons = async () => {
    const res = await fetch(currentPageUrl)
    const data = await res.json()

   
    setCurrentPageUrl(data.next)

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setPokemon( currentList => [...currentList, data])
        await pokemon.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }

  useEffect(() => {
    getAllPokemons()
  }, [])



  return (
    <div className="app-contaner">
      <h1>Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {pokemon.map( (pokemonStats, index) => 
            <PokemonList
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)
            }
          
        </div>
          <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
      </div>
    </div>
  )
}

export default App
