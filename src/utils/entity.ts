
export const getNearestEntity = (entityPos, entityAttributesRef) => {
  const entities = entityAttributesRef.current;
  let nearestEntityId = null;
  let minDistance = Infinity;

  for (const id in entities) {
    if (!entities[id].isAlive) continue;

    const distance = entityPos.distanceTo(entities[id].position);

    if (distance < minDistance) {
      nearestEntityId = id;
      minDistance = distance;
    }
  }

  return { id: nearestEntityId, distance: minDistance };
};