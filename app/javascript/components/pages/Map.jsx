import React, { useRef, useEffect, useState } from "react";
import { Fragment } from "react";
import Modal from "../components/Modal";

function getRandomOptionFromArray(Array){
  const rndInt = Math.floor(Math.random() * Array.length);
  return Array[rndInt];
}

export default function Map({pokemons, handlecart}) {

  const [show, setShow] = useState(false);
  const [pokemonData, setPokemonData] = useState({pokemon: "", encounter: ""});
  const [position, setPosition] = useState({x:100, y:100});

  const canvasRef = useRef(null)

  const handleShow = (value) => setShow(value);



  class Player {
    constructor(position){
      this.position = position
      this.velocity = {
        x: 0,
        y: 0
      }
      this.width = 25
      this.height = 25
    }

    draw(context){
      context.fillStyle= 'red'
      context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(context, canvas) {
      this.draw(context)
      if (this.position.y + this.velocity.y <= 0 || this.position.y + this.height + this.velocity.y >= canvas.height) this.velocity.y = 0;
      this.position.y += this.velocity.y
      if (this.position.x + this.velocity.x <= 0 || this.position.x + this.width + this.velocity.x >= canvas.width) this.velocity.x = 0;
      this.position.x += this.velocity.x
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = 500
    canvas.height = 500
    const context = canvas.getContext('2d')

    const player = new Player(position)

    function animate() {
      requestAnimationFrame(animate)
      context.clearRect(0,0, canvas.width, canvas.height)
      player.update(context, canvas)
    }
    animate()

    const handleKeyDown = ({keyCode}) => {
      if (show === false){
      const chosenPokemon = getRandomOptionFromArray(pokemons);
      const encounterDetails = chosenPokemon.version_details
          .find(element => element.version.name === "yellow")
          .encounter_details.filter(element => element.method.name ==="super-rod" || 
            element.method.name ==="walk" || 
            element.method.name ==="surf"
          );
      
      const chosenEncounter = getRandomOptionFromArray(encounterDetails);
      
      setPokemonData({pokemon: chosenPokemon, encounter: chosenEncounter});
      
      switch(keyCode){
        case 37:
          player.velocity.x = -5
          player.velocity.y = 0
          if (Math.random() <= chosenEncounter.chance/100) {
            setPosition({x: player.position.x, y: player.position.y})
            setShow(true);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            player.velocity.x = 0
          };
          break;
        case 40:
          player.velocity.y = 5
          player.velocity.x = 0
          if (Math.random() <= chosenEncounter.chance/100) {
            setPosition({x: player.position.x, y: player.position.y})
            setShow(true);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            player.velocity.y = 0
          };
          break;
        case 39:
          player.velocity.x = 5
          player.velocity.y = 0
          if (Math.random() <= chosenEncounter.chance/100) {
            setPosition({x: player.position.x, y: player.position.y})
            setShow(true);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            player.velocity.x = 0
          };
          break;
        case 38:
          player.velocity.y = -5
          player.velocity.x = 0
          if (Math.random() <= chosenEncounter.chance/100) {
            setPosition({x: player.position.x, y: player.position.y})
            setShow(true);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            player.velocity.y = 0
          };
          break;
      }
    }
    }

    const handleKeyUp = ({keyCode}) => {
      if (show === false){
        switch(keyCode){
          case 37:
            player.velocity.x = 0
            break;
          case 40:
            player.velocity.y = 0
            break;
          case 39:
            player.velocity.x = 0
            break;
          case 38:
            player.velocity.y = 0
            break;
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    }
  
  }, [show])
  

  return (
  <Fragment>
    {show? <Modal show={{show, handleShow}} pokemon={pokemonData.pokemon} level={pokemonData.encounter} handlecart={handlecart}/> : ""}
    <canvas ref={canvasRef} pokemons={pokemons}/>
  </Fragment>
  )
}