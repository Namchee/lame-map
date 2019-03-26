import Konva from 'konva'
import map from './../resources/floorplan/101.svg'
import node from './submodules/node'
import nodeData from './../resources/nodes/101-general.json'
import adjacencyData from './../resources/nodes/101-adjacency.json'

const width = window.innerWidth
const height = window.innerHeight

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
})

// dev purposes
stage.on('click', () => {
  console.log(stage.getPointerPosition())
})

let mapLayer = new Konva.Layer()
let nodeLayer = node({ nodeData, adjacencyData })
let imageObj = new Image()

imageObj.onload = function () {
  let map = new Konva.Image({
    image: imageObj,
    prevX: 0,
    prevY: 0
  })

  mapLayer.add(map)
  stage.add(mapLayer)
  stage.add(nodeLayer)

  stage.on('dragstart', () => {
    map.prevX = map.getAbsolutePosition().x
    map.prevY = map.getAbsolutePosition().y
  })

  stage.on('dragend', () => {
    let curX = map.getAbsolutePosition().x
    let curY = map.getAbsolutePosition().y
    let deltaX = Math.abs(map.prevX - curX)
    let deltaY = Math.abs(map.prevY - curY)
    
    if (curX > map.prevX) {
      stage.offsetX(stage.offsetX() - deltaX)
      stage.x(stage.x() - deltaX)
    } else {
      stage.offsetX(stage.offsetX() + deltaX)
      stage.x(stage.x() + deltaX)
    }

    if (curY > map.prevY) {
      stage.offsetY(stage.offsetY() - deltaY)
      stage.y(stage.y() - deltaY)
    } else {
      stage.offsetY(stage.offsetY() + deltaY)
      stage.y(stage.y() + deltaY)
    }

    stage.draw()
  })
}

imageObj.src = map

export default stage