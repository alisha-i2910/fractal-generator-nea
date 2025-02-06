import React, { useEffect, useRef, forwardRef } from 'react';

export const Canvas = forwardRef(function Canvas({ hoverEvent }, ref) {
  // Always create a local ref first.
  const localRef = useRef(null);
  // Use the forwarded ref if provided; otherwise, use the local ref.
  const canvasRef = ref || localRef;

  const width = 900;
  const height = 900;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Safety check

    const context = canvas.getContext('2d');
    // Fill the canvas black
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    // Plot the fractal. (Using x and y values from -2 to 2)


    // using offscreen canvas
    //const worker = new Worker('worker.js')
    //const worker = new Worker('../public/worker.js');
    const worker = new Worker("/worker.js")

    worker.onmessage = (event) => {
        console.log("message received from worker")
        const bitmap = event.data();
        //dont think i have to get context again, but incase
        const context = canvas.getContext('2d');
        context.transferFromImageBitmap(bitmap)
    }
    worker.postMessage({
        msg: 'start'
    })
    //for (let x = -0.296266496; x <= -0.04103637; x += 0.000001) {
      //for (let y = -1.144029611; y <=-0.957032508; y += 0.000001) {
        //mandelbrotvalues(x, y, context);
      //}
   // }

    // Remove the addEventListener code. We'll rely on the onMouseMove prop.
    // (If you want to use addEventListener instead, comment out the onMouseMove prop below.)
  }, [width, height, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={hoverEvent}  // This will trigger hoverEvent on mouse movement.
      style={{ border: '1px solid black' }} // Optional: makes the canvas visible.
    />
  );
});
