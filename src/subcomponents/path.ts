import fp101 from './../assets/floorplan/101.svg';
import fi101 from './../assets/floorinfo/101-general.json';
import fa101 from './../assets/floorinfo/101-adjacency.json';

class FILE_PATH {
  static readonly f101 = new FILE_PATH(
    fp101,
    fi101,
    fa101)

  private constructor (
    public floorplan: string, 
    public floorinfo: string, 
    public flooradjacency: string) {
  }
}

export default FILE_PATH;