import { boundary, boundaryOffset, terrainType } from "../constants/terrain";

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