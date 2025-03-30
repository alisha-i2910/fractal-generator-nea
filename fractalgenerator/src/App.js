import React, { useRef, useState } from 'react';
import { Canvas } from './components/generatecanvas';
import './styles/App.css'
import { Sidebar } from './components/sidebar';
import { sidebarstate } from './components/sidebar';
const height = 862;
const width = 1300;

function App() {
  const [coordX, setX] = useState(0);
  const [coordY, setY] = useState(0);
  const canvasReference = useRef(null);

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
    const x = (xcanvas / (width * 0.25)) - 2;
    const y = -1 * ((ycanvas / (height * 0.25)) - 2);
    setX(x);
    setY(y);
    console.log("hoverEvent triggered!"); 
  };

  //debouncing this
  const debouncehoverEvent = delayCoords(hoverEvent)

  //sidebar
      //defining their initial state
    const [iterationlimit, setiterationlimit] = useState(90);
    const [resolution, setresolution] = useState(0.004);
    const [c2, setc2] = useState(0); 
    const [c1, setc1] = useState(0);
    const [colour1, setcolour1] = useState("0a0e1f");
    const [colour2, setcolour2] = useState("1c3b5a");
    const [colour3, setcolour3] = useState("5a3b1c");
    const [colour4, setcolour4] = useState("8c5a44");
    const [colour5, setcolour5] = useState("b0a38c");


    //rendering check
    const [rendering, setrendering] = useState(false);


  return (
    <sidebarstate.Provider value={{ iterationlimit, setiterationlimit, resolution, setresolution, c2, setc2, c1, setc1, colour1, setcolour1, colour2, setcolour2, colour3, setcolour3, colour4, setcolour4, colour5, setcolour5}}>
    <div className="background">

      <div className="parent">
      <Canvas className="canvas" ref={canvasReference} hoverEvent={debouncehoverEvent} setrendering={setrendering} />
      <div className="sidebar">
        <Sidebar />
      </div>
      </div>
      <div className="coordinates-container">
      <h1>{coordX.toFixed(2)}, {coordY.toFixed(2)}</h1>
      <div>{rendering ? <p>Currently Rendering...</p> : <p>Rendering done!</p>}</div>
      </div>


    </div>
    </sidebarstate.Provider>
  );
}

export default App;

