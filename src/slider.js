import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.min'
import 'materialize-css/extras/noUiSlider/nouislider.css'

let horizontal_slider = document.querySelector('.horizontal-slider')
let vertical_slider = document.querySelector('.vertical-slider')

noUiSlider.create(horizontal_slider, {
  range: {
    'min': -180,
    'max': 180
  },
  start: 0,
  step: 0.5,
  tooltips: false,
  orientation: 'horizontal'
})

noUiSlider.create(vertical_slider, {
  start: 0.75,
  direction: 'rtl',
  orientation: 'vertical',
  tooltips: false,
  range: {
    'min': 0.5,
    'max': 2
  }
})