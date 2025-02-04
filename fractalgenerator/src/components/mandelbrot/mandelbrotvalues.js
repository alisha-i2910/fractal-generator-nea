import React, {useEffect, useRef} from 'react';
import App from '../../App';

const colours = [
  '#000033', '#000046', '#000059', '#00006d', '#000080',
  '#000099', '#0000b3', '#0000cc', '#0000e6', '#0000ff',
  '#0d1aff', '#1a33ff', '#264dff', '#3366ff', '#407fff',
  '#4d99ff', '#59b2ff', '#66ccff', '#73e6ff', '#80ffff',
  '#80e6e6', '#80cccc', '#80b3b3', '#809999', '#808080',
  '#809999', '#80b3b3', '#80cccc', '#80e6e6', '#80ffff',
  '#99ffff', '#b3ffff', '#ccffff', '#e6ffff', '#ffffe6',
  '#ffffcc', '#ffffb3', '#ffff99', '#ffff80', '#ffff66',
  '#fffa4d', '#fff533', '#ffee1a', '#ffe800', '#ffe000',
  '#ffd900', '#ffd200', '#ffcc00', '#ffc500', '#ffbf00',
  '#ffb800', '#ffb200', '#ffab00', '#ffa500', '#ff9e00',
  '#ff9800', '#ff9100', '#ff8b00', '#ff8400', '#ff7e00',
  '#ff7700', '#ff7100', '#ff6a00', '#ff6400', '#ff5d00',
  '#ff5700', '#ff5000', '#ff4a00', '#ff4300', '#ff3d00',
  '#ff3600', '#ff3000', '#ff2900', '#ff2300', '#ff1c00',
  '#ff1600', '#ff0f00', '#ff0900', '#ff0200', '#f90000',
  '#f20000', '#eb0000', '#e50000', '#de0000', '#d80000',
  '#d10000', '#cb0000', '#c40000', '#be0000', '#b70000',
  '#b10000', '#aa0000', '#a40000', '#9d0000', '#970000'
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
        colour = 'black';
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
