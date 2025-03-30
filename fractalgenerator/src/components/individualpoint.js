import {generatecolourarray} from './hexcolourarray'

const colours = generatecolourarray(["70674c", "04131c", "0aa846", "8c5a44", "b0a38c"])
const numberofcolours = colours.length;

export function individualpoint(x, y, iterationlimit){
    //running it through the mandelbrot equation
    let z = [0, 0];
    let colour = null;
    let b = 0;

    for (let i = 0; i < iterationlimit; i++) {
        b++
        const z_real = z[0] * z[0] - z[1] * z[1] + x;
        const z_imaginary = 2 * z[0] * z[1] + y;
        z = [z_real, z_imaginary];
        const z_absolute = z_real * z_real + z_imaginary * z_imaginary;

        if (z_absolute > 4) {
          let indexofcolour = Math.min(numberofcolours - 1, Math.floor((b / iterationlimit) * numberofcolours))
          colour = colours[indexofcolour]
          break;
        }
      }

      if (colour === null)
        {
            colour = 'black';
        }

    //determining escape velocity

    let velocity = null;
    let withinset = false;

    if (b < iterationlimit){
        if (b < 0.3333 * iterationlimit){
            velocity = "Your point escaped at a high velocity."
        }
        else if (b < 0.6666 * iterationlimit){
            velocity = "Your point escaped at a medium velocity."
        }
        else if (b > 0.6666 * iterationlimit){
            velocity= "Your point escaped at a low velocity."
        }
    }
    else{
        velocity = "Your point remained bounded."
        withinset = true;
    }

    //returning values we need

    return{
        colour,
        iteration: b,
        velocity,
        withinset 
    }

}

//we need to return
//x + yi
//Your value ran through the iterative formula n times, before a colour was determined
//if this is maximum -> your point reached the iteration limit.
//Your colour assigned was ______
//Your point escaped/stayed bounded
//escaped: high/medium/low velocity.


//so return
//colour
//b
//escape velocity