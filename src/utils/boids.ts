import { Vector2, Vector3 } from "three";

export const getAlignmentDirection = (originEntityId, entityAttributes) => {
  const originEntityPos = entityAttributes[originEntityId].position;
  const originEntityPosXZ = new Vector2(originEntityPos.x, originEntityPos.z);
  const direction = new Vector3();
  let numInRange = 0;

  for (const id in entityAttributes) {
    if (!entityAttributes[id].isAlive || id === originEntityId) continue;
    const entityAttributesPos = entityAttributes[id].position;
    const targetEntityPosXZ = new Vector2(entityAttributesPos.x, entityAttributesPos.z);
    const distance = originEntityPosXZ.distanceTo(targetEntityPosXZ);
    if (distance < 1.5) {
      direction.add(entityAttributes[id].direction);
      numInRange++;
    }
  }
  
  if (numInRange > 0) direction.divideScalar(numInRange);
  return direction;
};

export const getCohesionDirection = (originEntityId, entityAttributes) => {
  const originEntityPos = entityAttributes[originEntityId].position;
  const originEntityPosXZ = new Vector2(originEntityPos.x, originEntityPos.z);
  const direction = new Vector3();
  let numInRange = 0;

  for (const id in entityAttributes) {
    if (!entityAttributes[id].isAlive || id === originEntityId) continue;
    const entityAttributesPos = entityAttributes[id].position;
    const targetEntityPosXZ = new Vector2(entityAttributesPos.x, entityAttributesPos.z);
    const distance = originEntityPosXZ.distanceTo(targetEntityPosXZ);
    if (distance < 1.5) {
      direction.add(entityAttributes[id].position);
      numInRange++;
    }
  }
  
  if (numInRange > 0) direction.divideScalar(numInRange);
  return direction;
};

export const getSeparationDirection = (originEntityId, entityAttributes) => {
  const originEntityPos = entityAttributes[originEntityId].position;
  const originEntityPosXZ = new Vector2(originEntityPos.x, originEntityPos.z);
  const direction = new Vector3();
  const diff = new Vector3();
  let numInRange = 0;

  for (const id in entityAttributes) {
    if (!entityAttributes[id].isAlive || id === originEntityId) continue;
    const entityAttributesPos = entityAttributes[id].position;
    const targetEntityPosXZ = new Vector2(entityAttributesPos.x, entityAttributesPos.z);
    let distance = originEntityPosXZ.distanceTo(targetEntityPosXZ);
    if (distance < 0.5) {
      diff.subVectors(originEntityPos, entityAttributes[id].position);
      diff.normalize();
      distance = Math.max(distance, 0.05);
      diff.divideScalar(distance);
      direction.add(diff);
      numInRange++;
    }
  }
  
  if (numInRange > 0) direction.divideScalar(numInRange);
  return direction;
};

export const getFleeDirection = (originEntityId, originEntityAttributes, predatorAttributes) => {
  const originEntityPos = originEntityAttributes[originEntityId].position;
  const originEntityPosXZ = new Vector2(originEntityPos.x, originEntityPos.z);
  const direction = new Vector3();
  const diff = new Vector3();
  let numInRange = 0;

  for (const id in predatorAttributes) {
    if (!predatorAttributes[id].isAlive) continue;
    const entityAttributesPos = predatorAttributes[id].position;
    const targetEntityPosXZ = new Vector2(entityAttributesPos.x, entityAttributesPos.z);
    let distance = originEntityPosXZ.distanceTo(targetEntityPosXZ);
    if (distance < 2.5) {
      diff.subVectors(originEntityPos, predatorAttributes[id].position);
      diff.normalize();
      // distance = Math.max(distance, 0.01);
      // diff.divideScalar(distance);
      direction.add(diff);
      numInRange++;
    } 
  }
  
  if (numInRange > 0) direction.divideScalar(numInRange);
  return direction;
};