import Konva from 'konva'
import Graph from './Graph'
import Place from './Place'
import 'font-awesome/css/font-awesome.min.css'

let table = new Map()

function generateNodeLayer ({ nodeData: data, adjacencyData: adjacency }) {
  table.clear()

  const node_layer = new Konva.Layer()
  for (let i = 0; i < data.list.length; i++) {
    let new_node = data.list[i]
    let info = new_node.id

    for (let j = 0; j < new_node.x.length; j++) {
      let x = new_node.x[j]
      let y = new_node.y[j]
      let place = new Place(info, x, y)
      table.set(info, place)

      if (new_node.shadow) 
        node_layer.add(generateShadowNodes({ x, y, info }))
      else 
        node_layer.add(generateNodes({ x, y, info }))
    }
  }

  table.forEach((value, key, map) => {
    let arr = adjacency[key]
    let len = arr.length

    for (let i = 0; i < len; i++) {
      value.addDestination(table.get(arr[i]))
    }
  })

  return node_layer
}

function generateShadowNodes ({ x, y, info }) {
  let shadow_node = new Konva.Circle({
    x,
    y,
    radius: 10,
    fill: '#363636'
  })

  // DEV MODE
  shadow_node.on('click', () => {
    console.log(info)
  })

  return shadow_node
}

function generateNodes ({ x, y, info }) {
  let new_node = new Konva.Text({
    x,
    y, 
    text: '\uf192',
    fontFamily: 'FontAwesome',
    fill: '#209CEE',
    fontSize: 50
  })

  // DEV MODE
  new_node.on('click', () => {
    console.log(info)
  })

  return new_node
}

export default generateNodeLayer