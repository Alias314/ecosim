import { useEffect } from "react";
import { Vector2, Vector3 } from "three";
import { rabbit, wolf, bush } from "../constants/entity";
import { getSpawnCoordinate, getTerrainIndex, handleOutOfBounds } from "./canvas";
import { defaultTerrainAttributes } from "@/constants/terrain";

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
  entityAttributes,
  heightMap
) => {
  const terrainSize = defaultTerrainAttributes.size;

  for (let i = 0; i < amountRabbits; i++) {
    const startPos = getSpawnCoordinate(
      rabbit.size,
      10, 
      terrainSize, 
      heightMap
    ).clone();

    entityAttributes.rabbit[i].isAlive = true;
    entityAttributes.rabbit[i].position = startPos;
    entityAttributes.rabbit[i].hungerCapacity = rabbit.hungerCapacity;
  }

  for (let i = 0; i < amountWolves; i++) {
    const startPos = getSpawnCoordinate(
      wolf.size,
      10, 
      terrainSize,
      heightMap
    ).clone();

    entityAttributes.wolf[i].isAlive = true
    entityAttributes.wolf[i].position = startPos.clone();
    entityAttributes.wolf[i].hungerCapacity = wolf.hungerCapacity;
  }

  for (let i = 0; i < amountBush; i++) {
    const startPos = getSpawnCoordinate(
      bush.size,
      10, 
      terrainSize,
      heightMap
    ).clone();

    entityAttributes.bush[i].isAlive = true;
    entityAttributes.bush[i].position = startPos.clone();
  }
};

export const getEntityPool = (poolSize) => {
  const entityAttributes = {rabbit: [], wolf: [], bush: []};
  const initPos = new Vector3(0, 0, 0);

  for (let i = 0; i < poolSize; i++) {
    entityAttributes.rabbit.push({
      id: i,
      position: initPos,
      isAlive: false,
      hungerCapacity: rabbit.hungerCapacity,
      maxBreedingUrge: rabbit.maxBreedingUrge,
      gender: getRandomGender(),
      direction: new Vector3()
    });
  }

  for (let i = 0; i < poolSize; i++) {
    entityAttributes.wolf.push({
      id: i,
      position: initPos,
      isAlive: false,
      hungerCapacity: wolf.hungerCapacity,
      maxBreedingUrge: wolf.maxBreedingUrge,
      gender: getRandomGender(),
      direction: new Vector3()
    });
  }

  for (let i = 0; i < poolSize; i++) {
    entityAttributes.bush.push({
      id: i,
      position: initPos,
      isAlive: false,
      hungerCapacity: bush.hungerCapacity
    });
  }

  return entityAttributes;
};

export const isEntityAlive = (originEntityId, entityAttributes) => {
  return entityAttributes[originEntityId].isAlive;
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
    defaultTerrainAttributes.size, 
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
  entityAttributes[id].hungerCapacity = entity.hungerCapacity / 2;
  entityAttributes[id].maxBreedingUrge = entity.maxBreedingUrge;
};

export const killAllEntities = (entityAttributes) => {
  for (const entityArr of Object.values(entityAttributes)) {
    entityArr.forEach((entity) => {
      entity.isAlive = false;
    });
  }
};