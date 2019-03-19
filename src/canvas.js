import Konva from 'konva'
import map from './../resources/unpar.svg'

const width = window.innerWidth
const height = window.innerHeight

// scale is temp
let stage = new Konva.Stage({
  container: 'canvas',
  width,
  height,
  draggable: true
})

stage.on('dragend', () => {
  let a = stage.getAbsolutePosition()
  let b = stage.getPointerPosition()
  let obj = {
    x: Math.abs(a.x - b.x),
    y: Math.abs(a.y - b.y)
  }

  // malah dapet posisi pointer lu --'
  debugCircle(obj)
})

let layer = new Konva.Layer()
let imageObj = new Image()

imageObj.onload = function () {
  let map = new Konva.Image({
    image: imageObj,
    width,
    height
  })
 
  layer.add(map)
  stage.add(layer)
}

imageObj.src = map

function debugCircle ({x, y}) {
  let debug = new Konva.Circle({
    x,
    y,
    radius: 10,
    fill: 'red',
    stroke: 'black'
  })

  layer.add(debug)
  layer.draw()
}

export default stage