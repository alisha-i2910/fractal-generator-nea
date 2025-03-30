import {generatecolourarray} from './hexcolourarray'


//note: set as x and y so mandelbrot.plot.apply(null, c) can be used - null for no context
export function mandelbrotvalues(x, y, context, iterationlimit, colours) {

  const numberofcolours = colours.length;

  //output
  let z = [0, 0];
  //colour is null
  let colour = null;
  //iteration count
  let b = 0;

  //iteration limit


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
      colour = `#${colours[indexofcolour]}`
      break;
    }
  }
  //If not in the set..
  if (colour === null)
    {
        colour = 'black';
    }

  //scaling attempts
  const height = 862;
  const width = 1300; 

  x = ((x + 2) * 0.25) * width;
  y = ((y + 2) * 0.25) * height;
  context.fillStyle = colour;
  context.fillRect(x, y, 1, 1);
  
  context.scale(1,1);
  context.translate(0,0);
  return colour;
}

