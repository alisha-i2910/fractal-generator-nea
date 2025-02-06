import React, { useRef, useState } from 'react';
import { Canvas } from './components/generatecanvas';

function App() {
  const [coordX, setX] = useState(0);
  const [coordY, setY] = useState(0);
  const canvasReference = useRef(null);

  //Since it's so slow, make a callback function with a delay
  //The 'callback' will be the function we fetch, so hoverEvent

  function delayCoords(cb, delay=800){
    let timeout
    return(...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(...args)
      }, delay) 
    }
  }
  const hoverEvent = (event) => {
    if (!canvasReference.current) return;
    const rect = canvasReference.current.getBoundingClientRect();
    const xcanvas = event.clientX - rect.left;
    const ycanvas = event.clientY - rect.top;
    const x = (xcanvas / (900 * 0.25)) - 2;
    const y = -1 * ((ycanvas / (900 * 0.25)) - 2);
    setX(x);
    setY(y);
    console.log("hoverEvent triggered!"); 
  };

  //debouncing this
  const debouncehoverEvent = delayCoords(hoverEvent)

  return (
    <div>
      <h1>08001111</h1>
      <Canvas ref={canvasReference} hoverEvent={debouncehoverEvent} />
      <h1>{coordX.toFixed(2)}, {coordY.toFixed(2)}</h1>
    </div>
  );
}

export default App;
