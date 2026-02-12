import { boundary, boundaryOffset, terrainType } from "../constants/terrain";
import { getRandomCoordinate } from "./math";

export const handleOutOfBounds = (pos) => {
  if (pos.x < boundary.x.min) pos.x = boundary.x.min + boundaryOffset;
  if (pos.x > boundary.x.max) pos.x = boundary.x.max - boundaryOffset;
  if (pos.z < boundary.z.min) pos.z = boundary.z.min + boundaryOffset;
  if (pos.z > boundary.z.max) pos.z = boundary.z.max - boundaryOffset;
};

export const getTerrainIndex = (pos, terrainSize) => {
  return {
    i: Math.floor((terrainSize / boundary.x.max) * pos.x),
    j: Math.floor((terrainSize / boundary.z.max) * pos.z)
  }
};

export const isOnWater = (posY) => {
  return posY <= terrainType.water.maxHeight;
};

export const getSpawnCoordinate = (range, heightMap) => {
  let spawnCoordinate = getRandomCoordinate(range);
  let terrainIndex = getTerrainIndex(spawnCoordinate, 512);

  while (heightMap[terrainIndex.j][terrainIndex.i] > terrainType.water.maxHeight) {
    spawnCoordinate = getRandomCoordinate(range);
    terrainIndex = getTerrainIndex(spawnCoordinate, 512);
  }

  return spawnCoordinate;
}