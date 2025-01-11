import { useEffect, useState } from "react";
import { PokeCard } from "./PokeCard";
import "../index.css"
export const Pokemon=()=>{
    const [pokemon,setPokemon]=useState([]);
    const [loading,setloading]=useState(true);
    
        const API="https://pokeapi.co/api/v2/pokemon?limit=24"


  const fetchPokemon=async()=>{
    try{
      const res=await fetch(API);
      const data=await res.json();
      // console.log(data);

      const detailedResult=data.results.map(async (curPokemon)=>{
        const result=await fetch(curPokemon.url);
        const finaldata=await result.json();
        // console.log(finaldata);
        return finaldata;
    });
    const detailedResponse=await Promise.all(detailedResult); 
    setPokemon(detailedResponse);
    setloading(false);
    console.log(detailedResponse);
    }
    catch(error){  
      console.log("error");
    }

  }
  useEffect(() => {
    fetchPokemon();
  }, []);

  if(loading)
  {
    return(
        <h2>Loading...</h2>
    );
  }
  return (
        <div>
            <div>Let's Catch Pokemon</div>
            <div>
                <ul>
                    {
                        pokemon.map((curPokemon)=>{
                            return (
                            <PokeCard key={curPokemon.id} pokemonData={curPokemon} />
                        )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}