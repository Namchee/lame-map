import Place from './Place'

class Graph {
  private _places: Set<Place>

  constructor () {
    this._places = new Set<Place>()
  }

  get places (): Set<Place> {
    return this._places
  }

  set places (places: Set<Place>) {
    this._places = places
  }

  addPlace (place: Place): void {
    this.places.add(place)
  }

  calculateShortestPath (graph: Graph, source: Place): Graph {
    this.resetPath()
    source.distance = 0

    let settledPlaces: Set<Place> = new Set<Place>()
    let unsettledPlaces: Set<Place> = new Set<Place>()

    unsettledPlaces.add(source)

    while (unsettledPlaces.size > 0) {
      let currentPlace: Place = this.getLowestDistanceNode(unsettledPlaces)
      unsettledPlaces.delete(currentPlace)

      let adjacencies: Map<Place, number> = currentPlace.adjacentNodes
      adjacencies.forEach((value, key, adjacencies) => {
        let adjacentPlace: Place = key
        let distance: number = value

        if (!settledPlaces.has(adjacentPlace)) {
          this.calculateMinimumDistance(adjacentPlace, distance, currentPlace)
          unsettledPlaces.add(adjacentPlace)
        }
      })

      settledPlaces.add(currentPlace)
    }

    return graph
  }

  private getLowestDistanceNode (unsettledPlaces: Set<Place>): Place {
    let lowestDistancePlace: Place = null
    let lowestDistance: number = +Infinity

    unsettledPlaces.forEach(place => {
      let currDistance = place.distance
      if (currDistance < lowestDistance) {
        lowestDistancePlace = place
        lowestDistance = currDistance
      }
    })

    return lowestDistancePlace
  }

  private calculateMinimumDistance (evaluated: Place, weight: number, source: Place): void {
    let sourceDistance: number = source.distance

    if (sourceDistance + weight < evaluated.distance) {
      evaluated.distance = sourceDistance + weight
      let shortestPath: Place[] = source.shortestPath
      shortestPath.push(source)
      evaluated.shortestPath = shortestPath
    }
  }

  private resetPath () {
    this.places.forEach(place => {
      place.resetShortestPath()
      place.distance = +Infinity
    })
  }
}

export default Graph