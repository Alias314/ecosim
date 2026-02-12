import { useEffect } from "react";
import { Vector2 } from "three";
import { rabbit, wolf, bush } from "../constants/entity";
import { getSpawnCoordinate, getTerrainIndex } from "./canvas";

export const getNearestEntity = (entityPos, entityAttributes) => {
  const entityPosXZ = new Vector2(entityPos.x, entityPos.z);
  let nearestEntityId = null;
  let minDistance = Infinity;
  
  for (const id in entityAttributes) {
    if (!entityAttributes[id].isAlive) continue;
    const entityAttributesPos = entityAttributes[id].position;
    const targetEntityPosXZ = new Vector2(entityAttributesPos.x, entityAttributesPos.z);

    const distance = entityPosXZ.distanceTo(targetEntityPosXZ);

    if (distance < minDistance) {
      nearestEntityId = id;
      minDistance = distance;
    }
  }

  if (nearestEntityId === null) return null;

  return { 
    id: nearestEntityId, 
    position: entityAttributes[nearestEntityId].position, 
    distance: minDistance 
  };
};

export const spawnEntities = (
  amountRabbits,
  amountWolves,
  amountBush,
  setRabbits, 
  setWolves,
  setBushes,
  entityAttributesRef,
  heightMap
) => {
  const tempRabbits = [];
  const tempWolves = [];
  const tempBush = [];

  for (let i = 0; i < amountRabbits; i++) {
    const startPos = getSpawnCoordinate(10, heightMap).clone();
    
    tempRabbits.push({ 
      id: i,
      position: startPos
    });

    entityAttributesRef.current.rabbit[i] = {
      id: i,
      position: startPos,
      isAlive: true,
      hungerCapacity: rabbit.hungerCapacity
    }
  }

  for (let i = 0; i < amountWolves; i++) {
    const startPos = getSpawnCoordinate(10, heightMap).clone();
    
    tempWolves.push({
      id: i,
      position: startPos
    });

    entityAttributesRef.current.wolf[i] = {
      id: i,
      position: startPos,
      isAlive: true,
      hungerCapacity: wolf.hungerCapacity
    }
  }

  for (let i = 0; i < amountBush; i++) {
    const startPos = getSpawnCoordinate(10, heightMap).clone();
    const terrainIndex = getTerrainIndex(startPos, 512);
    startPos.y = heightMap[terrainIndex.j][terrainIndex.i] * 2 + bush.size;
    
    tempBush.push({
      id: i,
      position: startPos
    });

    entityAttributesRef.current.bush[i] = {
      id: i,
      position: startPos,
      isAlive: true,
    }
  }

  setRabbits(tempRabbits);
  setWolves(tempWolves);
  setBushes(tempBush);
};