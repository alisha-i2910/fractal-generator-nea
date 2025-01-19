import React, {useEffect, useRef} from 'react';
import App from '../../App';

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

    //if condition - white as a temp colour
    if (z_absolute > 4) {
      finished = true;
      colour = 'black';
      break;
    }
  }

  //Now we know whether the point is in the set.
  //Depending on the number of iterations to get to it, we colour-code..

  if (b > (iterationlimit * 0.33333333) && finished == true)
    {
        colour = 'black';
    }
    if (b > (iterationlimit * 0.66666666) && finished == true)
        {
            colour = 'blue';
        }
        if (b > (iterationlimit * 0.99999999) && finished == true)
            {
                colour = 'purple';
            }

  //If not in the set..
  if (!finished)
    {
        colour = 'grey';
    }

  //scaling attempts
  const height = 900  
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
