//Update below for every hook used
import React, {useEffect, useRef} from 'react';
import { mandelbrotvalues } from './mandelbrot/mandelbrotvalues';

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
        for (let x = -2; x <= 2; x+=0.01)
        {
            for (let y = -2; y <= 2; y+=0.01)
            {
                const graphX = x
                const graphY = y
                mandelbrotvalues(graphX, graphY, context);
            }
        }

        //below, this function runs when width or height changes
    }, [width, height] );

    return(
    <canvas
        ref={canvasReference}
        width={width}
        height={height}
    />
    );
}
//notes:
//Study:
//1. references, how they update, and when to update them
//2. diff between " and ' in html/jsx
//3. why does useEffect need ()=> notation?