import Konva from 'konva'
import Graph from './graph'
import Place from './place'
import 'font-awesome/css/font-awesome.min.css'

const table: Map<string, Place> = new Map<string, Place>();
const graph: Graph = new Graph();

interface Point {
  x: number;
  y: number;
}

function generateNodeLayer ({ nodeData: data, adjacencyData: adjacency }): Konva.Layer {
  table.clear();
  graph.resetGraph();

  const node_layer = new Konva.Layer();

  for (let i = 0; i < data.list.length; i++) {
    let newPlace = data.list[i];
    let info = newPlace.id;
    let x = newPlace.x;
    let y = newPlace.y;

    let place = new Place(info, x, y, newPlace.shadow);
    table.set(info, place);
    graph.addPlace(place);

    if (!newPlace.shadow)
      node_layer.add(generateNodes({ x, y }));
    else
      node_layer.add(generateShadowNodes({ x, y }, info));

  }

  table.forEach((value, key) => {
    let arr = adjacency[key];
    let len = arr.length;

    for (let i = 0; i < len; i++) {
      value.addDestination(table.get(arr[i]));
    }
  })

  return node_layer
}

function generateNodes (point: Point): Konva.Text {
  let { x, y } = point;

  let placeNode = new Konva.Text({
    x,
    y,
    text: '\uf192',
    fontFamily: 'FontAwesome',
    fill: '#209CEE',
    fontSize: 50
  });

  // dunno why... Add another 2.5 to make line centered
  placeNode.offsetX(placeNode.width() / 2 + 2.5);
  placeNode.offsetY(placeNode.height() / 2);

  return placeNode;
}

function generateShadowNodes (point: Point, info: string): Konva.Circle {
  let { x, y } = point;

  let shadows = new Konva.Circle({
    x,
    y,
    radius: 10,
    fill: 'black'
  });

  return shadows;
}

function drawPath (source: string, finalDestination: string): Konva.Layer {
  let pathLayer: Konva.Layer = new Konva.Layer();

  let sourcePlace: Place = table.get(source);
  graph.calculateShortestPath(sourcePlace);

  let finalPlace: Place = table.get(finalDestination);
  let path: Place[] = finalPlace.shortestPath;

  path.push(finalPlace);

  let points: number[] = [];
  let len: number = path.length;

  for (let i: number = 1; i < len; i++) {
    points.push(path[i - 1].x, path[i - 1].y, path[i].x, path[i].y);  
  }

  let line = new Konva.Line({
    stroke: '#42a5f5',
    strokeWidth: 8,
    lineJoin: 'round',
    lineCap: 'round',
    points
  });

  pathLayer.add(line)

  return pathLayer;
}

function fillElement (elem: HTMLElement): void {
  table.forEach((value, key) => {
    if (!value.shadow) {
      let option = document.createElement('option');
      option.textContent = key;
      option.value = key;
      elem.appendChild(option);
    }
  });
}

export default { generateNodeLayer, drawPath, fillElement }