import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.min';
import 'materialize-css/extras/noUiSlider/nouislider.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min';

let horizontal_slider = document.querySelector('.horizontal-slider');
let vertical_slider = document.querySelector('.vertical-slider');

noUiSlider.create(horizontal_slider, {
  range: {
    'min': -180,
    'max': 180
  },
  start: 0,
  step: 0.5,
  tooltips: false,
  orientation: 'horizontal'
});

noUiSlider.create(vertical_slider, {
  start: 1,
  direction: 'rtl',
  orientation: 'vertical',
  tooltips: false,
  range: {
    'min': 0.5,
    'max': 2
  }
});

function initDropdown (data) {
  let elem = document.querySelector('.selector');
  while (elem.firstChild)
    elem.removeChild(elem.firstChild);

  if (data === null) {
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

export default { initDropdown };