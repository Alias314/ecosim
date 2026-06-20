import { terrainType, defaultTerrainAttributes } from "../constants/terrain";
import { getRandomCoordinate } from "./math";

export const handleOutOfBounds = (pos) => {
  const boundary = defaultTerrainAttributes.boundary;
  if (pos.x < boundary.x.min) pos.x = boundary.x.min + boundary.offset;
  if (pos.x > boundary.x.max) pos.x = boundary.x.max - boundary.offset;
  if (pos.z < boundary.z.min) pos.z = boundary.z.min + boundary.offset;
  if (pos.z > boundary.z.max) pos.z = boundary.z.max - boundary.offset;
};

export const getTerrainIndex = (pos, terrainSize) => {
  return {
    i: Math.floor((terrainSize / defaultTerrainAttributes.boundary.x.max) * pos.x),
    j: Math.floor((terrainSize / defaultTerrainAttributes.boundary.z.max) * pos.z)
  }
};

export const getSpawnCoordinate = (entitySize, range, terrainSize, heightMap) => {
  let spawnCoordinate = getRandomCoordinate(range);
  let terrainIndex = getTerrainIndex(spawnCoordinate, defaultTerrainAttributes.size);

  while (heightMap[terrainIndex.j][terrainIndex.i] <= terrainType.water.maxHeight) {
    spawnCoordinate = getRandomCoordinate(range);
    terrainIndex = getTerrainIndex(spawnCoordinate, defaultTerrainAttributes.size);
  }

  spawnCoordinate.y = heightMap[terrainIndex.j][terrainIndex.i] + entitySize;

  return spawnCoordinate;
};

export const isOnWater = (posY) => {
  return posY <= terrainType.water.maxHeight;
};
