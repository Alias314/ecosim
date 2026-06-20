import { useFrame } from '@react-three/fiber';
import { getNearestEntity, getNearestMate } from '../../utils/entity';

const useHandleEntityState = (
  id,
  entityMeshRef,
  entityDetectionRange,
  predatorAttributes,
  foodAttributes,
  mateAttributes,
  targetEntityRef,
  stateRef,
  panicHunger,
  breedingHunger,
  seekHunger
) => {
  useFrame(() => {
    const entityPos = entityMeshRef.current.position;
    const nearestPredator = getNearestEntity(entityPos, predatorAttributes);
    const nearestFood = getNearestEntity(entityPos, foodAttributes);
    const nearestMate = getNearestMate(id, mateAttributes);

    const fleeRange = stateRef.current === "flee"
      ? entityDetectionRange * 1.4
      : entityDetectionRange;

    const hungry = mateAttributes[id].hungerCapacity <= seekHunger;
    const wantsFood = nearestFood && (nearestFood.distance <= entityDetectionRange || hungry);
    const desperate = wantsFood && mateAttributes[id].hungerCapacity <= panicHunger;

    if (nearestPredator && nearestPredator.distance <= fleeRange && !desperate) {
      stateRef.current = "flee";
      targetEntityRef.current = nearestPredator;
    } else if (mateAttributes[id].maxBreedingUrge <= 0 && mateAttributes[id].hungerCapacity >= breedingHunger && nearestMate && nearestMate.distance <= entityDetectionRange) {
      stateRef.current = "mating";
      targetEntityRef.current = nearestMate;
    } else if (wantsFood) {
      stateRef.current = "chase"
      targetEntityRef.current = nearestFood;
    } else {
      stateRef.current = "explore";
      targetEntityRef.current = null;
    }
  });
};

export default useHandleEntityState;