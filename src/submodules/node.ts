import Konva from 'konva'
import Graph from './Graph'
import Place from './Place'
import 'font-awesome/css/font-awesome.min.css'

const table: Map<string, Place> = new Map<string, Place>()
const graph: Graph = new Graph()

interface Point {
  x: number
  y: number
}

function generateNodeLayer ({ nodeData: data, adjacencyData: adjacency }): Konva.Layer {
  table.clear()
  graph.resetGraph()

  const node_layer = new Konva.Layer()

  for (let i = 0; i < data.list.length; i++) {
    let new_node = data.list[i]
    let info = new_node.id

    for (let j = 0; j < new_node.x.length; j++) {
      let x = new_node.x[j]
      let y = new_node.y[j]
      let place = new Place(info, x, y)
      table.set(info, place)
      graph.addPlace(place)

      if (!new_node.shadow)
        node_layer.add(generateNodes({ x, y }, info))
      else
        node_layer.add(generateShadowNodes({ x, y }, info))
    }
  }

  table.forEach((value, key) => {
    let arr = adjacency[key]
    let len = arr.length

    for (let i = 0; i < len; i++) {
      value.addDestination(table.get(arr[i]))
    }
  })

  return node_layer
}

function generateNodes (point: Point, info: string): Konva.Text {
  let { x, y } = point

  let new_node = new Konva.Text({
    x,
    y, 
    text: '\uf192',
    fontFamily: 'FontAwesome',
    fill: '#209CEE',
    fontSize: 50
  })

  new_node.on('click', () => {
    console.log(info)
  })

  return new_node
}

function generateShadowNodes (point: Point, info: string): Konva.Circle {
  let { x, y } = point

  let shadows = new Konva.Circle({
    x,
    y,
    radius: 10,
    fill: 'black'
  })

  shadows.on('click', () => {
    console.log(info)
  })

  return shadows
}

function drawLine (source: Place, destination: Place): Konva.Line {
  let line = new Konva.Line({
    stroke: '#90CAF9',
    strokeWidth: 10,
    lineJoin: 'round',
    lineCap: 'round',
    points: [ source.x, source.y, destination.x, destination.y ]
  })

  return line
}

function drawPath (source: string, finalDestination: string): Konva.Layer {
  let pathLayer: Konva.Layer = new Konva.Layer()

  let sourcePlace: Place = table.get(source)
  graph.calculateShortestPath(sourcePlace)

  let finalPlace: Place = table.get(finalDestination)
  let path: Place[] = finalPlace.shortestPath
  
  let adjacency = finalPlace.adjacentNodes
  path.unshift(sourcePlace)

  let line: Konva.Line
  let len: number = path.length
  for (let i: number = 1; i < len; i++) {
    line = drawLine(path[i - 1], path[i])
    pathLayer.add(line)
  }

  return pathLayer
}

export default { generateNodeLayer, drawPath }