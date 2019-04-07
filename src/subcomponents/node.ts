import Konva from 'konva';
import Graph from './graph';
import Place from './place';
import 'font-awesome/css/font-awesome.min.css';

interface Point {
  x: number;
  y: number;
}

function drawNodes (nodes: Set<Place>): Konva.Layer {
  let nodeLayer: Konva.Layer = new Konva.Layer;

  nodes.forEach(value => {
    let x = value.x;
    let y = value.y;

    if (!value.shadow)
      nodeLayer.add(generateNodes({ x, y }));
  })

  return nodeLayer;
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

function drawPath (finalDestination: Place): Konva.Layer {
  let pathLayer: Konva.Layer = new Konva.Layer();

  let path: Place[] = finalDestination.shortestPath;
  path.push(finalDestination);

  let points: number[] = [];
  let len: number = path.length;

  for (let i = 1; i < len; i++) {
    points.push(path[i - 1].x, path[i - 1].y);
    points.push(path[i].x, path[i].y);
  }

  let pathLine: Konva.Line = new Konva.Line({
    stroke: '#42a5f5',
    strokeWidth: 8,
    lineJoin: 'round',
    lineCap: 'round',
    points
  });

  pathLayer.add(pathLine);
  
  return pathLayer;
}

export default { drawNodes, drawPath };