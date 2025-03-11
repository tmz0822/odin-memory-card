function Card({ pokemon, onClick }) {
  return (
    <div className="card" onClick={() => onClick(pokemon.id)}>
      <img src={pokemon.sprites.back_default} alt={pokemon.name} />
      <div>{pokemon.name}</div>
    </div>
  );
}

export default Card;
