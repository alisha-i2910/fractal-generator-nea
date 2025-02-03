import React, {useEffect, useRef, useState} from 'react';
import './styles/App.css';
import { Canvas } from './components/generatecanvas';
import { hovercoordinates } from './components/hovercoordinates';

function App() 
{
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const MoveEvent = (event) => {
    hovercoordinates(event, setCoordinates);
  }
  return (
    <div>
      {/* title */}
    <h1>nea</h1>

      {/* canvas */}
      <Canvas onMouseMove={MoveEvent} />

      {/* coordinates */}
      <div className = "coordinates-container">
        <h1>{coordinates.x.toFixed(5)}, {coordinates.y.toFixed(5)}</h1>
      </div>
    </div>
  );
}

export default App;
