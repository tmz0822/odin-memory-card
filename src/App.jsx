import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log('useEffect');
    fetchPokemon();
  }, []);

  function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  async function fetchPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=12';
    try {
      const response = await fetch(url);
      const data = await response.json();

      const pokemonList = data.results;

      const pokemonDetails = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          return pokemonResponse.json();
        })
      );

      setCards(pokemonDetails);
    } catch (error) {
      console.error(error);
    }
  }

  function onClick(clicked) {
    if (!clicked) {
      setCurrentScore(currentScore + 1);
      const shuffledCards = shuffle(cards);
      setCards(shuffledCards);
    } else {
      // Clicked same card twice
      if (bestScore < currentScore) {
        setBestScore(currentScore);
      }
      setCurrentScore(0);
    }
  }

  return (
    <div>
      <header>
        <h1>Memory Card Game</h1>
        <div className="scoreboard">
          <div>Current score: {currentScore}</div>
          <div>Best score: {bestScore}</div>
        </div>
      </header>
      <main className="cards-container">
        {cards.map((card) => (
          <Card key={card.id} pokemon={card} onClick={onClick} />
        ))}
      </main>
    </div>
  );
}

export default App;

