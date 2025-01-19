const { performance } = require('perf_hooks');

function mandelbrotvalues(x, y) {

  let b = 0;

  let z = [0, 0];

  let finished = null;
  
  let colour = null;

  for (let i = 0; i < 30; i++) {
    b++;
    console.log(i.toString());

    const z_real = z[0] * z[0] - z[1] * z[1] + x;
    const z_imaginary = 2 * z[0] * z[1] + y;
    z = [z_real, z_imaginary];
    const z_absolute = z_real * z_real + z_imaginary * z_imaginary;
    console.log(z_absolute);

    if (z_absolute > 4) 
    {
      finished = true;
      colour = 'white';
      console.log("I have assigned your colour " + colour);
      console.log("..at iteration " + b);
      break;
    }

  }



  if (b > 3 && finished == true)
    {
        colour = 'black';
        console.log("I have assigned your colour " + colour);
        console.log("..at iteration " + b);
    }
    if (b > 10 && finished == true)
        {
            colour = 'blue';
            console.log("I have assigned your colour " + colour);
            console.log("..at iteration " + b);
        }
        if (b > 20 && finished == true)
            {
                colour = 'purple';
                console.log("I have assigned your colour " + colour);
                console.log("..at iteration " + b);
            }


  if (!finished)
    {
        colour = 'red';
        console.log("I have assigned your colour " + colour);
    }
  console.log("Your point is the colour " + colour + 
    ".\nYour final z value is " + z.toString() + 
    ".\nYour iteration count is " + b.toString() + ".");

    return z;
}

function scaling(x,y, width, height){

  console.log("Your x value is " + x.toString());
  console.log("Your y value is " + y.toString());
  //treat xplot and yplot as how 'far left' or 'far down' you are on the axis
  let xplot = 0;
  let yplot = 0;

  let z = mandelbrotvalues(x,y);
  if (x > 0){
    xplot = x;
  }
  else{
    xplot = (-1 * x) + 2;
  }

  if (y > 0){
    yplot = y;

  }
  else{
    yplot = (-1 * y) + 2;
  }

  xplot = width * (1 - xplot/4);
  yplot = 0 + height * (yplot/4);

  console.log("And your plot for x is " + xplot.toString());
  console.log("And your plot for y is " + yplot.toString());

}

//MAIIIIIIIIIIIIIIIN
console.log("Your start time is: " + performance.now());

scaling(-0.975443384, -0.261937245, 400, 400);

console.log("Your end time is: " + performance.now());