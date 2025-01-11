import "../index.css"
export const PokeCard=({pokemonData})=>{
    return(
        <li className="pokemon-card">
            <figure>
                <img  className="pokemon-image"
                src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} />
            </figure>
            <h1 className="pokemon-name">
                {
                    pokemonData.name
                }
            </h1>
            <div className="pokemon-info pokemon-highlight">
                {/* <p>
                    {
                        pokemonData.types.map()
                    }
                </p> */}

            </div>

        </li>
    );

};