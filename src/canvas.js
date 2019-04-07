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

function generateMap (map, nodeData, adjacencyData) {
  stage.destroyChildren();

  let image = new Image();
  let mapLayer = new Konva.Layer();

  image.onload = () => {
    let imageObj = new Konva.Image({
      image,
      prevX: 0,
      prevY: 0
    });

    initGraph(nodeData, adjacencyData);
    handleDrag(imageObj);
    generateShortestPath(table.get(position));

    mapLayer.add(imageObj);
    let nodeLayer = node.drawNodes(graph.places);
    let pathLayer = node.drawPath(table.get('Mushola'));

    stage.add(mapLayer);
    stage.add(nodeLayer);
    stage.add(pathLayer);
    stage.draw();

    loader.style.display = 'none';
  };

  image.src = map;
}

function handleDrag (map) {
  /**
   * TODOS
   * Add dragBoundFunc later
   */

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

export default { generateMap, zoom, rotate };