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

export const getDeadEntityId = (entityAttributes) => {
  const deadEntityId = entityAttributes.find(entity => entity.isAlive === false);
  return deadEntityId;
};

export const spawnEntity = (
  amountRabbits,
  amountWolves,
  amountBush,
  entityAttributesRef,
  heightMap
) => {
  const terrainSize = 512;

  for (let i = 0; i < amountRabbits; i++) {
    const startPos = getSpawnCoordinate(
      rabbit.size,
      10, 
      terrainSize, 
      heightMap
    ).clone();

    entityAttributesRef.current.rabbit[i] = {
      id: i,
      position: startPos,
      isAlive: true,
      hungerCapacity: rabbit.hungerCapacity
    }
  }

  for (let i = 0; i < amountWolves; i++) {
    const startPos = getSpawnCoordinate(
      wolf.size,
      10, 
      terrainSize,
      heightMap
    ).clone();

    entityAttributesRef.current.wolf[i] = {
      id: i,
      position: startPos,
      isAlive: true,
      hungerCapacity: wolf.hungerCapacity
    }
  }

  for (let i = 0; i < amountBush; i++) {
    const startPos = getSpawnCoordinate(
      bush.size,
      10, 
      terrainSize,
      heightMap
    ).clone();

    entityAttributesRef.current.bush[i] = {
      id: i,
      position: startPos,
      isAlive: true,
    }
  }
};