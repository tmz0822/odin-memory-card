import { useState } from 'react';

function Card({ pokemon, onClick }) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(true);
    onClick(clicked);
  }

  return (
    <div className="card" onClick={handleClick}>
      <img src={pokemon.sprites.back_default} alt={pokemon.name} />
      <div>{pokemon.name}</div>
    </div>
  );
}

export default Card;
