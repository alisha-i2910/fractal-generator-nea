import '../styles/App.css'
export function hovercoordinates(event)

{
    //retrieving cursor position via canvas
    const canvas = event.target;

    let rect = canvas.getBoundingClientRect();

    let xcanvas = event.clientX - rect.left;
    let ycanvas = event.clientY - rect.top;

    console.log("X for canvas is " + xcanvas + " Y for canvas is " + ycanvas)

    //converting into the x y coord
    const width = 900;
    const height = 900;

    let x = (xcanvas / (width * 0.25)) - 2;
    let y = (ycanvas / (width * 0.25)) - 2;

    //outputting x y coord
    console.log("ur actual x is " + x + " ur actual y is " + y)
}