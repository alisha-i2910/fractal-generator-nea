//Update below for every hook used
import React, {useEffect, useRef} from 'react';
import { mandelbrotvalues } from './mandelbrot/mandelbrotvalues';

export function Canvas({hoverEvent})
{
    //making a reference
    const canvasReference=useRef(null);

    //assigning width and height based on the screen dimensions
    const width=900;
    const height=900;

    useEffect(() => {

        //getting the current canvas reference
        const canvas=canvasReference.current;

        //getting canvas context
        const context=canvas.getContext('2d');

        //filling canvas black
        context.fillStyle='black';
        context.fillRect(0, 0, width, height);

        //onto the fractal plotting

        //a for loop to go through every combination of x and y values
        //we use -2=>2 as the standard range for the mandelbrot set
        for (let x = -2; x <= 2; x+=0.004)
        {
            for (let y = -2; y <= 2; y+=0.004)
            {
                const graphX = x
                const graphY = y
                mandelbrotvalues(graphX, graphY, context);
            }
        }

        //events!?
        //attach and cleanup for mouse hover
        canvas.addEventListener('mousemove', hoverEvent);
        return () => {
            canvas.removeEventListener('mousemove', hoverEvent);
          };

    }, [width, height, hoverEvent] );

    return(
    <canvas
        ref={canvasReference}
        width={width}
        height={height}
        onMouseMove={hoverEvent}
    />
    );
}
