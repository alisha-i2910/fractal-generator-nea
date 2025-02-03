//Update below for every hook used
import React, {useEffect, useRef} from 'react';
import { mandelbrotvalues } from './mandelbrot/mandelbrotvalues';
import { hovercoordinates } from './hovercoordinates'

export function Canvas()
{
    //making a reference
    const canvasReference=useRef(null);

    //assigning width and height based on the screen dimensions
    // TEMPORARILY, SET TO 300x300
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
        for (let x = -2; x <= 2; x+=0.007)
        {
            for (let y = -2; y <= 2; y+=0.007)
            {
                const graphX = x
                const graphY = y
                mandelbrotvalues(graphX, graphY, context);
            }
        }

        //below, this function runs when width or height changes

        //events!?

        const hoverevent = (event) => {
            hovercoordinates(event);
        }

        //attach and cleanup for mouse hover
        canvas.addEventListener('mousemove', hoverevent);
        canvas.addEventListener('mousemove', hoverevent);

    }, [width, height] );

    return(
    <canvas
        ref={canvasReference}
        width={width}
        height={height}
        onMouseMove={onMoveEvent}
    />
    );
}
