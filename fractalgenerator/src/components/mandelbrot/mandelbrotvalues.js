import React, {useEffect, useRef} from 'react';
import App from '../../App';

const colours = [
  '#ff6600', '#ffcc00', '#ffff00', '#ccff33', '#99ff66',
  '#66ff99', '#33ffcc', '#00ffff', '#00ccff', '#0066ff',
  '#0033cc', '#3300cc', '#6600cc', '#9900ff', '#cc00ff',
  '#9900cc', '#660099', '#330066', '#1a0033', '#000000'
];
const numberofcolours = colours.length;

//note: set as x and y so mandelbrot.plot.apply(null, c) can be used - null for no context
export function mandelbrotvalues(x, y, context) {
  
  //output
  let z = [0, 0];
  //finished?
  let finished = false;
  //colour is null
  let colour = null;
  //iteration count
  let b = 0;

  //iteration limit

  let iterationlimit = 90;

  for (let i = 0; i < iterationlimit; i++) {

    b++

    //finding real component
    const z_real = z[0] * z[0] - z[1] * z[1] + x;
    //finding imaginary component
    const z_imaginary = 2 * z[0] * z[1] + y;
    //reassign z
    z = [z_real, z_imaginary];
    //find absolute value for z
    //taking out math.sqrt, as this helps computation power
    const z_absolute = z_real * z_real + z_imaginary * z_imaginary;

  
    //once the condition to be in the set is met, colour-code
    if (z_absolute > 4) {
      let indexofcolour = Math.min(numberofcolours - 1, Math.floor((b / iterationlimit) * numberofcolours))
      colour = colours[indexofcolour]
    }
  }
  //If not in the set..
  if (colour === null)
    {
        colour = 'grey';
    }

  //scaling attempts
  const height = 900;
  const width = 900; 

  x = ((x + 2) * 0.25) * width;
  y = ((y + 2) * 0.25) * height;
  context.fillStyle = colour;
  context.fillRect(x, y, 1, 1);
  const image = document.getElementById('app');
  //context.drawImage(image, x, y, 1, 1,);

  context.scale(1,1);
  context.translate(0,0);
  return colour;
}


//additions to be made:
// higher variety of colours - gradients
// this should be in accordance to the number of iterations, which will change the iteration limits
