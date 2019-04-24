import fp101 from './../assets/floorplan/101.svg';
import fi101 from './../assets/floorinfo/101-general.json';
import fa101 from './../assets/floorinfo/101-adjacency.json';

const FLOOR_PLAN = new Map<string, any>();
const FLOOR_INFO = new Map<string, any>();
const FLOOR_ADJACENCY = new Map<string, any>();

FLOOR_PLAN.set('f101', fp101);
FLOOR_INFO.set('f101', fi101);
FLOOR_ADJACENCY.set('f101', fa101);

function getAssets (floor) {
  return [ FLOOR_PLAN.get(floor), FLOOR_INFO.get(floor), FLOOR_ADJACENCY.get(floor) ];
}

export default { getAssets };