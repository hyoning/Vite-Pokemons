import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react'

const PokeCard = ({url, name}) => {
  const [pokemon, setPokmon ] = useState();

  useEffect(() => {
    fetchPokeDetailData()

  }, [])

  async function fetchPokeDetailData(){
    try {
        const response = await axios.get(url);
        formatPokemonData(response.data);
    } catch(error){

    }
  }

  function formatPokemonData(params){

  }

  return (
    <div>PokeCard</div>
  )
}

export default PokeCard