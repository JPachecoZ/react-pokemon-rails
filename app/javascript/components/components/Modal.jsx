import React from "react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

export default function Modal(props){
   
  const initialPokemonData = {
    name: "",
    stats: {
      hp: 0,
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
      speed: 0,
    },
    type: 0,
    picture_url: ""
  }

  const [pokemon, setPokemon] = useState(initialPokemonData)

  useEffect(() => {
    fetch(props.pokemon.pokemon.url)
      .then(response => response.json())
      .then(data => {
        const pokemonData = {
          name: data.name,
          stats: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            special_attack: data.stats[3].base_stat,
            special_defense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
          },
          type: data.types[0].type.name,
          picture_url: data.sprites.other.dream_world.front_default
        }
        setPokemon(pokemonData);
      });
  }, []);

  const Container = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgb(23 23 23 / 75%);
    display:flex;
    justify-content: center;
    align-items: center;
    ${props.show.show ? "" : "display: none;"}
  `

  const Card = styled.div`
    width: 15rem;
    height: 28rem;
    background-color: white;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  `

  const Title = styled.div`
    font-size: large;
    text-align: center;
  `

  const Text = styled.p`
    font-size: medium;
    text-align: center;
  `

  const Picture = styled.img`
    height: 10rem;
    width: 10rem;
  `

  const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `
  const Button = styled.button`
    margin: 1rem;
  `

  function handleLeaveClick(e){
    e.preventDefault();
    props.show.handleShow(false);
  }
  
  function handleCaptureClick(e){
    e.preventDefault();
    props.handlecart(pokemon);
    props.show.handleShow(false);
  }

  return (
    <Container>
      <Card>
        <Title>Wild {pokemon.name} appeared!</Title>
        <Picture src={pokemon.picture_url}/>
        <Text> HP: {pokemon.stats.hp} </Text>
        <Text> Attack: {pokemon.stats.attack} </Text>
        <Text> Defense: {pokemon.stats.defense} </Text>
        <Text> Special Attack: {pokemon.stats.special_attack} </Text>
        <Text> Special Defense: {pokemon.stats.special_defense} </Text>
        <Text> Speed: {pokemon.stats.speed} </Text>
        <Text> Type: {pokemon.type} </Text>
        <Footer>
          <Button onClick={e => handleCaptureClick(e)}>Capture</Button>
          <Button onClick={e => handleLeaveClick(e)}>Leave</Button>
        </Footer>
      </Card>
    </Container>
  )
}