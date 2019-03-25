class Place {
  private _id: string
  private x: number 
  private y: number
  private _distance: number
  private _shortestPath: Place[]
  private _adjacentNodes: Map<Place, number>

  constructor (id: string, x: number, y: number) {
    this._id = id
    this.x = x
    this.y = y
    this._distance = +Infinity
    this._adjacentNodes = new Map<Place, number>()
  }

  set distance (distance: number) {
    this._distance = distance
  }

  get distance (): number {
    return this._distance
  }

  set shortestPath (path: Place[]) {
    this._shortestPath = path
  }

  get shortestPath (): Place[] {
    return this._shortestPath
  }

  get id (): string {
    return this._id
  }

  get adjacentNodes (): Map<Place, number> {
    return this._adjacentNodes
  }

  addDestination (destination: Place): void {
    let deltaX: number = Math.pow(this.x - destination.x, 2) 
    let deltaY: number = Math.pow(this.y - destination.y, 2)
    let distance: number = Math.sqrt(deltaX + deltaY)

    this.adjacentNodes.set(destination, distance)
    destination.adjacentNodes.set(this, distance)
  }

  resetShortestPath (): void {
    this.shortestPath.length = 0
  }

  removeAdjacentVertex (removed: Place): boolean {
    if (this.adjacentNodes.has(removed)) {
      this.adjacentNodes.delete(removed)
      return true
    }

    return false
  }
}

export default Place