import { useFrame } from '@react-three/fiber';
import { getNearestEntity } from '../../utils/entity';

const useHandleEntityState = (
  entityMeshRef,
  entityDetectionRange,
  predatorAttributes,
  foodAttributes,
  targetEntityRef,
  stateRef
) => {  
  const safeFleeDistance = entityDetectionRange * 2;
  
  useFrame(() => {
    const entityPos = entityMeshRef.current.position;
    const nearestPredator = getNearestEntity(entityPos, predatorAttributes);
    const nearestFood = getNearestEntity(entityPos, foodAttributes);
    
    if (nearestPredator && stateRef.current === "flee" && nearestPredator.distance <= safeFleeDistance) {
      stateRef.current = "flee";
      targetEntityRef.current = nearestPredator;
    } else if (nearestPredator && nearestPredator.distance <= entityDetectionRange) {
      stateRef.current = "flee";
      targetEntityRef.current = nearestPredator;
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