import { useEffect, useState } from "react";
import { PokeCard } from "./PokeCard";
import "../index.css"
export const Pokemon=()=>{
    const [pokemon,setPokemon]=useState([]);
    const [loading,setloading]=useState(true);
    const [search,setsearch]=useState("")
    
    const API="https://pokeapi.co/api/v2/pokemon?limit=500"


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
  const searchData=pokemon.filter((curPokemon)=>curPokemon.name.toLowerCase().includes(search.toLowerCase()));

  if(loading)
  {
    return(
        <h2>Loading...</h2>
    );
  }
  return (
    
        <section className="container">
            <header>
                <h1 className="">Let's Catch Pokemon</h1>
            </header>
            <div className="pokemon-search">
                <input type="text" placeholder="Search Pokemon"  value={search} onChange={(e)=>setsearch(e.target.value)}/>

            </div>
            <div>
                <div className="cards">
                    {
                        searchData.map((curPokemon)=>{
                            return (
                            <PokeCard key={curPokemon.id} pokemonData={curPokemon} />
                        );
                        })
                    }
                </div>
            </div>
        </section>
        
    );
}
