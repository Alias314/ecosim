
export const handleOutOfBounds = (nextPos, boundary) => {
  const offset = 0.01;
  
  if (nextPos.x < boundary.x.min) nextPos.x = boundary.x.min + offset;
  if (nextPos.x > boundary.x.max) nextPos.x = boundary.x.max - offset;
  if (nextPos.z < boundary.z.min) nextPos.z = boundary.z.min + offset;
  if (nextPos.z > boundary.z.max) nextPos.z = boundary.z.max - offset;
};

export const getTerrainIndex = (nextPos, terrainSize) => {
  return {
    x: Math.floor((terrainSize / 10) * nextPos.x),
    z: Math.floor((terrainSize / 10) * nextPos.z)
  }
};

export const isOnWater = (nextY) => {
  return nextY <= 0.4;
};