import React, {useEffect, useRef, useState} from 'react';
import './styles/App.css';
import { Canvas } from './components/generatecanvas';
import { hovercoordinates } from './components/hovercoordinates';

//EDIT WIDTH AND HEIGHT -> PUT THEM AT 900 FOR FINDX AND FINDY

function App() 
{
  //coordinates via useState:

  const [coordX, setX] = useState(() => {
    console.log("hello. :) useState ran X!")
    return 0
  })
  const [coordY, setY] = useState(() => {
    console.log("hello. :) useState ran Y!")
    return 0
  })

  //the onMouseMove event
    function hoverEvent(event){
    const canvas = event.target;
    const rect = canvasReference.current.getBoundingClientRect();
    findX(event, rect);
    findY(event, rect);
    console.log("hoverevent ran!?!?!?")
  }

  //to convert x and y from canvas to coords
  function findX(event, rect){
    let xcanvas = event.clientX - rect.left;
    let x = (xcanvas / (900 * 0.25)) - 2;
    setX(x)
  }
  function findY(event, rect){
    let ycanvas = event.clientY - rect.top;
    let y = (ycanvas / (900 * 0.25)) - 2;
    setY(y)

  }

  //using canvas
  const canvasReference=useRef(null);

  return (
    <div>
      {/* title */}
    <h1>08001111</h1>

      {/* canvas */}
      <Canvas onMouseOver={hoverEvent} />

      {/* coordinates */}
      <h1>{coordX.toFixed(10)}, {coordY.toFixed(10)}</h1>
      </div>
  );
}

export default App;
