import React, {useEffect, useRef} from 'react';
import './styles/App.css';
import { Canvas } from './components/generatecanvas';
import { hovercoordinates } from './components/hovercoordinates';

function App() 
{
  return (
    <div>
      {/* title */}
    <h1>nea</h1>

      {/* canvas */}
      <Canvas />
    </div>
  );
}

export default App;
