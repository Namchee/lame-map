/**
 * ENTRY POINT FILE
 */

import ui from './src/ui';
import canvas from './src/canvas';
import './src/assets/styles/style.scss';
import PATH from './src/subcomponents/path';

let currentFloor = {
  floorinfo: null,
  floorplan: null,
  flooradjacency: null
};

/*
currentFloor.floorinfo = PATH.FLOOR_INFO.get('f101');
currentFloor.floorplan = PATH.FLOOR_PLAN.get('f101');
currentFloor.flooradjacency = PATH.FLOOR_ADJACENCY.get('f101');
*/

canvas.generateMap(currentFloor.floorplan, currentFloor.floorinfo, currentFloor.flooradjacency);
ui.initDropdown(currentFloor.floorinfo);

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