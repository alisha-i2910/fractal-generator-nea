import {mandelbrotvalues} from '../src/mandelbrotvalues'

const height = 900;
const width = 900;

onmessage = (event) => {
    switch(event.data.msg){
        case 'start':
            const offscreencanvas = new OffscreenCanvas(height, width)
            const offscreencontext = offscreencanvas.getContext('2d')

            for (let x = -2; x <= 2; x += 0.004) {
                for (let y = -2; y <=-2; y += 0.004) {
                  mandelbrotvalues(x, y, offscreencontext);
                }
            }

            const bitmap = offscreencanvas.transferToImageBitmap()
            postMessage(bitmap);
            break;
        
        default:
            break;
    }
}