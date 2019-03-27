/**
 * ENTRY POINT FILE
 */

import './src/slider'
import './src/canvas'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize'
import './src/styles/style.scss'
import mip from './src/canvas'

M.AutoInit()

let zoomSlider = document.querySelector('.vertical-slider')

zoomSlider.noUiSlider.on('slide', () => {
  let think_tank = zoomSlider.noUiSlider.get()
  mip.scale({ x: think_tank, y: think_tank })
  mip.draw()
})

let rotateSlider = document.querySelector('.horizontal-slider')
rotateSlider.noUiSlider.on('slide', () => {
  let tank_think = rotateSlider.noUiSlider.get()
  mip.rotation(tank_think)
  mip.draw()
})