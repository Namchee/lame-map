import Konva from 'konva';
import Place from './place';
import 'font-awesome/css/font-awesome.min.css';

interface Point {
  x: number;
  y: number;
}

function drawNodes(nodes: Set<Place>): Konva.Layer {
  let nodeLayer: Konva.Layer = new Konva.Layer();

  nodes.forEach(value => {
    let x = value.x;
    let y = value.y;
    let key = value.id;

    if (!value.shadow)
      nodeLayer.add(generateNodes({ x, y }, key));
  })

  return nodeLayer;
}

function generateNodes(point: Point, key: string): Konva.Text {
  let { x, y } = point;

  let placeNode = new Konva.Text({
    x,
    y,
    text: '\uf192',
    fontFamily: 'FontAwesome',
    fill: '#209cee',
    fontSize: 50,
    key,
    shadowBlur: 10,
    shadowOffset: { x: 0, y: 0 },
    shadowColor: '#209CEE',
    shadowOpacity: 0.65,
    type: 'place'
  });

  // dunno why... Add another 2.5 to make line centered
  placeNode.offsetX(placeNode.width() / 2 + 2.5);
  placeNode.offsetY(placeNode.height() / 2);

  return placeNode;
}

function drawPathLayer(finalDestination: Place): Konva.Layer {
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
    stroke: '#209cee',
    strokeWidth: 8,
    lineJoin: 'round',
    lineCap: 'round',
    points,
    key: finalDestination.distance,
    type: 'path'
  });

  pathLayer.add(pathLine);

  return pathLayer;
}

function drawTooltip(): object {
  let tooltipLayer = new Konva.Layer();

  let tooltip = new Konva.Label({
    opacity: 1,
    visible: false,
    listening: false
  });

  tooltip.add(new Konva.Tag({
    fill: '#363636',
    pointerDirection: 'down',
    pointerHeight: 10,
    pointerWidth: 10,
    lineJoin: 'round',
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: { x: 10, y: 10 },
    shadowOpacity: 0.5,
    strokeWidth: 10
  }));

  tooltip.add(new Konva.Text({
    text: '',
    fontFamily: 'FontAwesome',
    fontSize: 24,
    padding: 15,
    fill: 'white'
  }));

  window.addEventListener('rotate', (e) => {
    tooltip.rotation(-e.detail);
  })

  tooltipLayer.add(tooltip);

  return { tooltipLayer, tooltip };
}

function updateTooltip(tooltip: Konva.Label, x: number, y: number, text: string, isPlace: boolean): void {
  let tex = (isPlace) ? `\uf041 ${text}` : `\uf018 ${text} m`;
  tooltip.getText().text(tex);
  tooltip.position({
    x,
    y
  });
  tooltip.show();
}

function hideTooltip(tooltip: Konva.Label) {
  tooltip.hide();
}

export default { drawNodes, drawPathLayer, drawTooltip, updateTooltip, hideTooltip };