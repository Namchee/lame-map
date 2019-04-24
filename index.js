/**
 * ENTRY POINT FILE
 * Contains state
 */

import ui from './src/ui';
import canvas from './src/canvas';
import './src/assets/styles/style.scss';
import PATH from './src/subcomponents/path';

let current = {
  floor: 'f101',
  position: '10102'
};

// canvas.drawSplash();
// use if here

canvas.drawMap(...PATH.getAssets(current.floor)).then((data) => {
  ui.initDropdown(data);
  
  window.addEventListener('pathchange', (e) => {
    canvas.drawPath(current.position, e.detail);
  });
  window.addEventListener('rotate', (e) => {
    canvas.rotateCanvas(e.detail);
  });
  window.addEventListener('scale', (e) => {
    canvas.scaleCanvas(e.detail);
  });
}).catch(() => {
  canvas.drawError();
});