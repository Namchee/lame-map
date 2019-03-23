import Konva from 'konva'
import map from './../resources/unpar.svg'

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

let nodeLayer = new Konva.Layer()
let tooltipLayer = new Konva.Layer()

let testCircle = new Konva.Circle({
  x: 633,
  y: 590,
  radius: 10,
  fill: 'white',
  stroke: 'black'
})

testCircle.on('mousemove', function () {
  tooltip.position({
    x: testCircle.x() - 90,
    y: testCircle.y() - 50
  })
  tooltip.text('Pintu Depan Gedung 10')
  tooltip.show()
  tooltipLayer.batchDraw()
})

testCircle.on('mouseout', function () {
  tooltip.hide()
  tooltipLayer.draw()
})

nodeLayer.add(testCircle)

var tooltip = new Konva.Text({
  text: '',
  fontFamily: 'Calibri',
  fontSize: 18,
  padding: 5,
  textFill: 'white',
  fill: 'black',
  alpha: 0.75,
  visible: false
})

let layer = new Konva.Layer()
let imageObj = new Image()

imageObj.onload = function () {
  let map = new Konva.Image({
    image: imageObj,
    prevX: 0,
    prevY: 0
  })

  layer.add(map)
  stage.add(layer)
  tooltipLayer.add(tooltip)
  stage.add(nodeLayer)
  stage.add(tooltipLayer)

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