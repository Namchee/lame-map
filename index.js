/**
 * ENTRY POINT FILE
 */

import './src/ui';
import canvas from './src/canvas';
import './src/assets/styles/style.scss';
import PATH from './src/subcomponents/path';

let { floorplan, floorinfo, flooradjacency } = PATH.f101;
canvas.generateMap(floorplan, floorinfo, flooradjacency);

let zoomSlider = document.querySelector('.vertical-slider');
let rotateSlider = document.querySelector('.horizontal-slider');

zoomSlider.noUiSlider.on('slide', () => {
  let zoomValue = zoomSlider.noUiSlider.get();
  canvas.zoom(zoomValue);
});

rotateSlider.noUiSlider.on('slide', () => {
  let degree = rotateSlider.noUiSlider.get();
  canvas.rotate(degree);
});