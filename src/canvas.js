import Konva from 'konva';
import node from './subcomponents/node';
import Place from './subcomponents/place';
import Graph from './subcomponents/graph';

let loader = document.querySelector('.main-loader');

const width = window.innerWidth;
const height = window.innerHeight;
const table = new Map();
const graph = new Graph();

let mapLayer = null;
let nodeLayer = null;
let pathLayer = null;
let tooltipLayer = null;

const stage = new Konva.Stage({
  container: 'canvas',
  width,
  height,
  offset: {
    x: width / 2,
    y: height / 2
  },
  x: width / 2,
  y: height / 2
});

stage.on('dragstart', () => {
  let position = stage.getPointerPosition();
  stage.prevX = position.x;
  stage.prevY = position.y;
});

stage.on('dragend', () => {
  let position = stage.getPointerPosition();
  let curX = position.x;
  let curY = position.y;
  let deltaX = Math.abs(stage.prevX - curX) * stage.scaleX();
  let deltaY = Math.abs(stage.prevY - curY) * stage.scaleY();

  if (curX > stage.prevX) {
    stage.offsetX(stage.offsetX() - deltaX);
    stage.x(stage.x() - deltaX);
  } else {
    stage.offsetX(stage.offsetX() + deltaX);
    stage.x(stage.x() + deltaX);
  }

  if (curY > stage.prevY) {
    stage.offsetY(stage.offsetY() - deltaY);
    stage.y(stage.y() - deltaY);
  } else {
    stage.offsetY(stage.offsetY() + deltaY);
    stage.y(stage.y() + deltaY);
  }

  stage.draw();
});

function drawMap(map, nodeData, adjacencyData) {
  return new Promise((resolve) => {
    loader.style.display = 'flex';

    stage.destroyChildren();
    stage.setAttr('draggable', true);

    let image = new Image();
    mapLayer = new Konva.Layer();

    image.onload = () => {
      let imageObj = new Konva.Image({
        image
      });

      initGraph(nodeData, adjacencyData);
      nodeLayer = node.drawNodes(graph.places);

      mapLayer.add(imageObj);

      stage.add(mapLayer);
      stage.add(nodeLayer);
      stage.draw();

      loader.style.display = 'none';
      resolve(nodeData);
    };

    image.src = map;
  });
}

function initGraph(nodeData, adjacencyData) {
  table.clear();
  graph.resetGraph();

  for (let i = 0; i < nodeData.list.length; i++) {
    let newPlace = nodeData.list[i];
    let info = newPlace.id;
    let x = newPlace.x;
    let y = newPlace.y;

    let place = new Place(info, x, y, newPlace.shadow);
    table.set(info, place);
    graph.addPlace(place);
  }

  table.forEach((value, key) => {
    let arr = adjacencyData[key];
    let len = arr.length;

    for (let i = 0; i < len; i++) {
      value.addDestination(table.get(arr[i]));
    }
  });
}

function drawPath(source, destination) {
  loader.style.display = 'flex';

  if (pathLayer) {
    pathLayer.destroy();
  }
  if (tooltipLayer) {
    tooltipLayer.destroy();
  }

  generateShortestPath(table.get(source));

  pathLayer = node.drawPathLayer(table.get(destination));

  let tooltipObject = node.drawTooltip();
  tooltipLayer = tooltipObject.tooltipLayer;
  let tooltip = tooltipObject.tooltip;

  stage.add(pathLayer);
  stage.add(tooltipLayer);

  stage.on('mousemove', (e) => {
    let shape = e.target;
    if (shape && shape.attrs.key) {
      let transform = stage.getAbsoluteTransform().copy();
      transform.invert();
      let position = stage.getPointerPosition();
      let x = transform.point(position).x;
      let y = transform.point(position).y - 5;
      node.updateTooltip(tooltip, x, y, shape.attrs.key, shape.attrs.type === 'place');
      tooltipLayer.batchDraw();
    }
  });

  stage.on('mouseout', (e) => {
    let shape = e.target;
    if (shape && shape.attrs.key) {
      node.hideTooltip(tooltip);
      tooltipLayer.batchDraw();
    }
  });
  
  stage.batchDraw();

  loader.style.display = 'none';
}

function generateShortestPath(source) {
  graph.resetPath();
  graph.calculateShortestPath(source);
}

function drawSplash() {
  loader.style.display = 'flex';

  stage.destroyChildren();
  let splashLayer = new Konva.Layer();

  let splash = new Konva.Text({
    x: width / 2,
    y: height / 2,
    width: width / 2,
    text: 'Welcome!\nPlease scan QR code to continue',
    fill: '#5c5b5b',
    fontSize: 40,
    fontFamily: 'Impact',
    align: 'center'
  });

  splash.offsetX(splash.width() / 2);
  splash.offsetY(splash.height() / 2);

  splashLayer.add(splash);

  let anim = new Konva.Animation((frame) => {
    let scale = Math.abs(Math.sin(frame.time / 5000 * 2 * Math.PI)) / 7 + 1;
    splash.scale({ x: scale, y: scale });
  }, splashLayer);

  anim.start();

  stage.add(splashLayer);
  stage.batchDraw();

  loader.style.display = 'none';
}

function drawError() {
  loader.style.display = 'flex';

  stage.destroyChildren();
  let errorLayer = new Konva.Layer();

  let error = new Konva.Text({
    x: width / 2,
    y: height / 2,
    width: width / 2,
    text: '~~Error!~~\nThis QR Code is unrecognizable!',
    fill: '#5C5B5B',
    fontSize: 48,
    fontFamily: 'Impact',
    align: 'center'
  });

  error.offsetX(error.width() / 2);
  error.offsetY(error.height() / 2);

  errorLayer.add(error);

  let anim = new Konva.Animation((frame) => {
    let scale = Math.abs(Math.sin(frame.time / 5000 * 2 * Math.PI)) / 7 + 1;
    error.scale({ x: scale, y: scale });
  }, errorLayer);

  anim.start();

  stage.add(errorLayer);
  stage.batchDraw();

  loader.style.display = 'none';
}

function rotateCanvas(rotation) {
  stage.rotation(rotation);
  stage.batchDraw();
}

function scaleCanvas(scale) {
  stage.scale({ x: scale, y: scale });
  stage.batchDraw();
}

export default { drawMap, drawPath, drawError, drawSplash, rotateCanvas, scaleCanvas };