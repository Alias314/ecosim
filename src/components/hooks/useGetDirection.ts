import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import useGetRandomDirection from './useGetRandomDirection';
import { getNearestEntity } from '../../utils/entity';

const useGetDirection = (entityRef, entityAttributesRef, stateRef) => {
  const direction = new Vector3();
  const randomDirection = useGetRandomDirection(200);
  
  useFrame(() => {
    if (stateRef.current === "explore") {
      direction.copy(randomDirection.normalize());
    } else if (stateRef.current === "chase") {
      const entityPos = entityRef.current.position;
      const nearestEntity = getNearestEntity(entityPos, entityAttributesRef);
      const targetEntity = entityAttributesRef.current;

      if (nearestEntity.id && targetEntity[nearestEntity.id]) {
        direction.subVectors(
          targetEntity[nearestEntity.id].position, 
          entityPos
        ).normalize();
      }
    } else if (stateRef.current === "flee") {
      const entityPos = entityRef.current.position;
      const nearestEntity = getNearestEntity(entityPos, entityAttributesRef);
      const targetEntity = entityAttributesRef.current;

      if (nearestEntity.id && targetEntity[nearestEntity.id]) {
        direction.subVectors(
          entityPos,
          targetEntity[nearestEntity.id].position
        ).normalize();
      }
    }
  });

  return direction;
};

export default useGetDirection;