import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.min';
import 'materialize-css/extras/noUiSlider/nouislider.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min';

let rotateSlider = document.querySelector('.horizontal-slider');
let scaleSlider = document.querySelector('.vertical-slider');

noUiSlider.create(rotateSlider, {
  range: {
    'min': -180,
    'max': 180
  },
  start: 0,
  step: 0.5,
  tooltips: false,
  orientation: 'horizontal'
});

noUiSlider.create(scaleSlider, {
  start: 1,
  direction: 'rtl',
  orientation: 'vertical',
  tooltips: false,
  range: {
    'min': 0.5,
    'max': 2
  }
});

rotateSlider.noUiSlider.on('slide', () => {
  window.dispatchEvent(new CustomEvent('rotate', { detail: rotateSlider.noUiSlider.get() }));
});

scaleSlider.noUiSlider.on('slide', () => {
  window.dispatchEvent(new CustomEvent('scale', { detail: scaleSlider.noUiSlider.get() }));
});

function initDropdown (data) {
  let elem = document.querySelector('.selector');
  while (elem.firstChild)
    elem.removeChild(elem.firstChild);

  if (data === null || data === undefined) {
    let option = document.createElement('option');
    option.textContent = 'Scan QR Code...';
    option.value = '';
    option.selected = true;
    option.disabled = true;
    elem.appendChild(option);
    M.AutoInit();

    return;
  }

  let option = document.createElement('option');
  option.textContent = 'Pilih Tujuan...';
  option.value = '';
  option.selected = true;
  option.disabled = true;
  elem.appendChild(option);

  for (let i = 0; i < data.list.length; i++) {
    let newPlace = data.list[i];
    let info = newPlace.id;

    let option = document.createElement('option');
    option.textContent = info;
    option.value = info;
    elem.appendChild(option);
  }

  elem.addEventListener('change', () => {
    window.dispatchEvent(new CustomEvent('pathchange', { detail: elem.value }));
  });

  M.AutoInit();
}

function resetSlider() {
  rotateSlider.noUiSlider.set(0);
  scaleSlider.noUiSlider.set(1);
}

export default { initDropdown, resetSlider };