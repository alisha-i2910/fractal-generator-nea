import React, { useEffect, useRef, forwardRef, useContext } from 'react';
import '../styles/App.css'
import {sidebarstate} from './sidebar'

export const Canvas = forwardRef(function Canvas({ hoverEvent, setrendering }, ref) {

  const {iterationlimit} = useContext(sidebarstate);
  const {resolution} = useContext(sidebarstate);
  const {colour1} = useContext(sidebarstate);
  const {colour2} = useContext(sidebarstate);
  const {colour3} = useContext(sidebarstate);
  const {colour4} = useContext(sidebarstate);
  const {colour5} = useContext(sidebarstate);
  
  
  const localRef = useRef(null);
  // use the forwarded ref if provided - otherwise, use the local ref.
  const canvasRef = ref || localRef;

  const height = 862;
  const width = 1300;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Safety check

    const context = canvas.getContext('2d');
    // Fill the canvas black
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    //when we switch between resolutions, we need to switch between workers
    let active = true;

    const worker = new Worker(new URL('./worker.js', import.meta.url))

    setrendering(true);
    worker.postMessage({
        question: 'wheres my fractal',
        iterationlimit: iterationlimit,
        resolution: Number(resolution) || 0.004,
        colours: [colour1, colour2, colour3, colour4, colour5]
    })
    worker.onmessage = ({ data: { answer } }) => {
      if (active){
        const context = canvas.getContext('2d');
        context.drawImage(answer, 0, 0);
        setrendering(false);
      }
      };
      return () => {
        active = false; //workers now inactive
        worker.terminate(); // so kill it
        setrendering(false);
      };

  }, [canvasRef, iterationlimit, resolution, colour1, colour2, colour3, colour4, colour5]);

  return (
    <canvas
    className="canvas"
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={hoverEvent}  // trigger hoverEvent on mouse movement.
    />
  );
});
