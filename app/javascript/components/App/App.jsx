import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "../pages/Homepage";
import Map from "../pages/Map";

export default function App(){
  const [pokemons, setPokemons] = useState([]);

  const handlePokemons = (data) => setPokemons(data);


  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage handlePokemons={handlePokemons}/>}/>
        <Route path="/map" element={<Map pokemons={pokemons} />}/>
      </Routes>
    </BrowserRouter>
  )
}