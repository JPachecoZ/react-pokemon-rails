import React from "react"
import { useState, useEffect } from "react"
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
`

export default function HomePage({handlePokemons}){

  const[locations, setLocations] = useState([]);
  const[areas, setAreas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/region/kanto/")
      .then(response => response.json())
      .then(data => setLocations(data.locations));
  }, []);

  function handleClick(e, location){
    e.preventDefault();
    fetch(location.url)
      .then(response => response.json())
      .then(data => {
        setAreas(data.areas);
      });
  };

  function handleClickPoke(e, area){
    e.preventDefault();
    fetch(area.url)
      .then(response => response.json())
      .then(data => {
        handlePokemons(data.pokemon_encounters.filter(pokemon => pokemon.version_details.find(element => element.version.name === "yellow") !== undefined));
        navigate('/map');
      })
  };

  return(
    <Container>
      <ul>
        {locations ? locations.map(location => {
          return (<li style={{cursor: "pointer"}} key={location.name} onClick={e =>handleClick(e, location)}>{location.name}</li>)
        }) : ""}
      </ul>
      <ul>
        {areas ? areas.map(area => {
          return <li style={{cursor: "pointer"}} key={area.name} onClick={e =>handleClickPoke(e, area)}>{area.name}</li>
        }): ""}
      </ul>
    </Container>
  )
}