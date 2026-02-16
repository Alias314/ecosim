import { useEffect } from "react";
import { Vector2, Vector3 } from "three";
import { rabbit, wolf, bush } from "../constants/entity";
import { getSpawnCoordinate, getTerrainIndex, handleOutOfBounds } from "./canvas";

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

export const getNearestMate = (originEntityId, entityAttributes) => {
  const entityPos = entityAttributes[originEntityId].position;
  const entityPosXZ = new Vector2(entityPos.x, entityPos.z);
  let nearestEntityId = null;
  let minDistance = Infinity;
  
  for (const id in entityAttributes) {
    if (id === originEntityId || !entityAttributes[id].isAlive || entityAttributes[originEntityId].gender === entityAttributes[id].gender) continue;
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
  const deadEntity = entityAttributes.find(entity => entity.isAlive === false);
  return deadEntity ? deadEntity.id : null;
};

export const getChaseDirection = (from, to) => {
  const direction = new Vector3();
  direction.subVectors(to, from).normalize();
  return direction;
};

export const initSpawnEntity = (
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

    entityAttributesRef.current.rabbit[i].isAlive = true;
    entityAttributesRef.current.rabbit[i].position = startPos;
  }

  for (let i = 0; i < amountWolves; i++) {
    const startPos = getSpawnCoordinate(
      wolf.size,
      10, 
      terrainSize,
      heightMap
    ).clone();

    entityAttributesRef.current.wolf[i].isAlive = true
    entityAttributesRef.current.wolf[i].position = startPos.clone();
  }

  for (let i = 0; i < amountBush; i++) {
    const startPos = getSpawnCoordinate(
      bush.size,
      10, 
      terrainSize,
      heightMap
    ).clone();

    entityAttributesRef.current.bush[i].isAlive = true;
    entityAttributesRef.current.bush[i].position = startPos.clone();
  }
};

export const initEntityPool = (entityAttributesRef) => {
  const poolSize = 400;
  const initPos = new Vector3(0, 0, 0);

  for (let i = 0; i < poolSize; i++) {
    entityAttributesRef.current.rabbit[i] = {
      id: i,
      position: initPos,
      isAlive: false,
      hungerCapacity: rabbit.hungerCapacity,
      maxBreedingUrge: rabbit.maxBreedingUrge,
      gender: getRandomGender(),
      direction: new Vector3()
    }
  }

  for (let i = 0; i < poolSize; i++) {
    entityAttributesRef.current.wolf[i] = {
      id: i,
      position: initPos,
      isAlive: false,
      hungerCapacity: wolf.hungerCapacity,
      maxBreedingUrge: wolf.maxBreedingUrge,
      gender: getRandomGender(),
      direction: new Vector3()
    }
  }

  for (let i = 0; i < poolSize; i++) {
    entityAttributesRef.current.bush[i] = {
      id: i,
      position: initPos,
      isAlive: false,
      hungerCapacity: bush.hungerCapacity
    }
  }
};

export const getRandomGender = () => {
  const genderList = ["male", "female"];
  const random = Math.round(Math.random());
  return genderList[random];
};

export const spawnEntity = (entity, entityAttributes, heightMap) => {
  const id = getDeadEntityId(entityAttributes);
  if (id === null) return;
  const startPos = getSpawnCoordinate(
    entity.size,
    10, 
    512, 
    heightMap
  );
  
  console.log(id);
  entityAttributes[id].isAlive = true;
  entityAttributes[id].position = startPos;
  entityAttributes[id].hungerCapacity = entity.hungerCapacity;
};

export const spawnBabyEntity = (entity, parentId, entityAttributes) => {
  const id = getDeadEntityId(entityAttributes);
  if (id === null) return;

  const startPos = new Vector3();
  startPos.copy(entityAttributes[parentId].position);
  startPos.x += Math.random() * 0.5;
  startPos.z += Math.random() * 0.5;
  handleOutOfBounds(startPos);
  entityAttributes[id].isAlive = true;
  entityAttributes[id].position = startPos;
  entityAttributes[id].hungerCapacity = entity.hungerCapacity;
  entityAttributes[id].maxBreedingUrge = 10;
};