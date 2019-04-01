import Konva from 'konva';
import node from './subcomponents/node.ts';
import map from './assets/floorplan/101.svg';
import nodeData from './assets/floorinfo/101-general.json';
import adjacencyData from './assets/floorinfo/101-adjacency.json';

let dropdown = document.querySelector('select');
let loader = document.querySelector('.main-loader');

const width = window.innerWidth;
const height = window.innerHeight;

// scale is temp
let stage = new Konva.Stage({
  container: 'canvas',
  width,
  height,
  draggable: true,
  offset: {
    x: width / 2,
    y: height / 2
  },
  x: width / 2,
  y: height / 2
});

let mapLayer = new Konva.Layer();
let nodeLayer = node.generateNodeLayer({ nodeData, adjacencyData });
let pathLayer = node.drawPath('10121', 'Mushola');
node.fillElement(dropdown);
let imageObj = new Image();

imageObj.onload = function () {
  let map = new Konva.Image({
    image: imageObj,
    prevX: 0,
    prevY: 0
  });

  mapLayer.add(map);
  stage.add(mapLayer);
  stage.add(nodeLayer);
  stage.add(pathLayer);

  stage.on('dragstart', () => {
    map.prevX = map.getAbsolutePosition().x;
    map.prevY = map.getAbsolutePosition().y;
  });

  stage.on('dragend', () => {
    let curX = map.getAbsolutePosition().x;
    let curY = map.getAbsolutePosition().y;
    let deltaX = Math.abs(map.prevX - curX);
    let deltaY = Math.abs(map.prevY - curY);

    if (curX > map.prevX) {
      stage.offsetX(stage.offsetX() - deltaX);
      stage.x(stage.x() - deltaX);
    } else {
      stage.offsetX(stage.offsetX() + deltaX);
      stage.x(stage.x() + deltaX);
    }

    if (curY > map.prevY) {
      stage.offsetY(stage.offsetY() - deltaY);
      stage.y(stage.y() - deltaY);
    } else {
      stage.offsetY(stage.offsetY() + deltaY);
      stage.y(stage.y() + deltaY);
    }

    stage.draw();
  });

  dropdown.addEventListener('change', () => {
    loader.style.display = 'flex';
    let value = dropdown.value;
    pathLayer.destroy();
    pathLayer = node.drawPath('10121', value);
    stage.add(pathLayer);
    stage.draw();
    loader.style.display = 'none';
  });

  loader.style.display = 'none';
};

imageObj.src = map;

export default stage;