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
  stateRef
) => {  
  useFrame(() => {
    const entityPos = entityMeshRef.current.position;
    const nearestPredator = getNearestEntity(entityPos, predatorAttributes);
    const nearestFood = getNearestEntity(entityPos, foodAttributes);
    const nearestMate = getNearestMate(id, mateAttributes);

    if (nearestPredator && nearestPredator.distance <= entityDetectionRange) {
      stateRef.current = "flee";
      targetEntityRef.current = nearestPredator;
    } else if (mateAttributes[id].maxBreedingUrge <= 0 && nearestMate && nearestMate.distance <= entityDetectionRange) {
      stateRef.current = "mating";
      targetEntityRef.current = nearestMate;
    } else if (nearestFood && nearestFood.distance <= entityDetectionRange) {
      stateRef.current = "chase"
      targetEntityRef.current = nearestFood;
    } else {
      stateRef.current = "explore";
      targetEntityRef.current = null;
    } 
  });
};

export default useHandleEntityState;