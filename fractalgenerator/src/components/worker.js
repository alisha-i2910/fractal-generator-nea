import React, {useContext} from 'react';
import {mandelbrotvalues} from './mandelbrotvalues'
import { generatecolourarray } from './hexcolourarray';

onmessage = ({ data: { question, iterationlimit, resolution, colours} }) => {

    const height = 862;
    const width = 1300;

    const ofscanvas = new OffscreenCanvas(width, height)
    const ofscontext = ofscanvas.getContext('2d')

    ofscontext.fillStyle = 'black';
    ofscontext.fillRect(0, 0, width, height);

    const colourarray = generatecolourarray(colours);

    const step = (typeof resolution === 'number' && resolution > 0) ? resolution : 0.004;
    for (let x = -2; x <= 2; x += step) {
        for (let y = -2; y <=2; y += step) {
          mandelbrotvalues(x, y, ofscontext, iterationlimit, colourarray);
        }
    }

    const bitmap = ofscanvas.transferToImageBitmap();

  postMessage({
    answer: bitmap,
  });
};