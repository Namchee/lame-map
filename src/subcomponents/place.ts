export default class Place {
  private _id: string
  private _x: number 
  private _y: number
  private _distance: number
  private _shortestPath: Place[]
  private _adjacentNodes: Map<Place, number>
  readonly shadow: boolean

  constructor (id: string, x: number, y: number, shadow: boolean) {
    this._id = id
    this._x = x
    this._y = y
    this._distance = Number.MAX_VALUE
    this._adjacentNodes = new Map<Place, number>()
    this._shortestPath = []
    this.shadow = shadow
  }

  get x () {
    return this._x
  }

  get y () {
    return this._y
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

  public addDestination (destination: Place): void {
    let deltaX: number = Math.pow(this.x - destination.x, 2) 
    let deltaY: number = Math.pow(this.y - destination.y, 2)
    let distance: number = Math.sqrt(deltaX + deltaY)

    this.adjacentNodes.set(destination, distance)
    destination.adjacentNodes.set(this, distance)
  }

  public resetShortestPath (): void {
    this._shortestPath.length = 0
  }

  public removeAdjacentVertex (removed: Place): boolean {
    if (this.adjacentNodes.has(removed)) {
      this.adjacentNodes.delete(removed)
      return true
    }

    return false
  }
}