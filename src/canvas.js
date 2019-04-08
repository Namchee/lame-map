import Konva from 'konva';
import node from './subcomponents/node';
import Place from './subcomponents/place';
import Graph from './subcomponents/graph';

let loader = document.querySelector('.main-loader');
let position = '10102';

const width = window.innerWidth;
const height = window.innerHeight;
const table = new Map();
const graph = new Graph();

let mapLayer = null;
let nodeLayer = null;
let pathLayer = null;

// scale is temp
const stage = new Konva.Stage({
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

stage.on('dragstart', () => {
  stage.prevX = stage.getAbsolutePosition().x;
  stage.prevY = stage.getAbsolutePosition().y;
});

stage.on('dragend', () => {
  let curX = stage.getAbsolutePosition().x;
  let curY = stage.getAbsolutePosition().y;
  let deltaX = Math.abs(stage.prevX - curX);
  let deltaY = Math.abs(stage.prevY - curY);

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

function generateMap (map, nodeData, adjacencyData) {
  loader.style.display = 'flex';

  if (map === null || nodeData === null || adjacencyData === null) {
    // draw splash
    drawSplash();
    loader.style.display = 'none';
    return;
  }
  stage.destroyChildren();

  let image = new Image();
  mapLayer = new Konva.Layer();

  image.onload = () => {
    let imageObj = new Konva.Image({
      image
    });

    initGraph(nodeData, adjacencyData);
    generateShortestPath(table.get(position));

    mapLayer.add(imageObj);
    nodeLayer = node.drawNodes(graph.places);

    window.addEventListener('pathchange', (e) => {
      if (pathLayer)
        pathLayer.remove();

      pathLayer = node.drawPath(table.get(e.detail));
      stage.add(pathLayer);
    });

    stage.add(mapLayer);
    stage.add(nodeLayer);
    stage.draw();

    loader.style.display = 'none';
  };

  image.src = map;
}

function initGraph (nodeData, adjacencyData) {
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

function generateShortestPath (source) {
  graph.resetPath();
  graph.calculateShortestPath(source);
}

function zoom (scale) {
  stage.scale({ x: scale, y: scale });
  stage.draw();
}

function rotate (degree) {
  stage.rotation(degree);
  stage.draw();
}

function drawSplash () {
  let splashLayer = new Konva.Layer();

  let splash = new Konva.Text({
    x: width / 2,
    y: height / 2,
    width: width / 2,
    text: 'Please scan QR code to continue',
    fill: '#5C5B5B',
    fontSize: 48,
    fontFamily: 'Impact',
    align: 'center'
  });

  splash.offsetX(splash.width() / 2);
  splash.offsetY(splash.height() / 2);

  splashLayer.add(splash);
  stage.add(splashLayer);
}

export default { generateMap, zoom, rotate };