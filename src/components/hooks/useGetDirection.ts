import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import useGetRandomDirection from './useGetRandomDirection';

const useGetDirection = (entityRef, targetEntityRef, stateRef) => {
  const direction = new Vector3();
  const randomDirection = useGetRandomDirection(200);
  
  useFrame(() => {
    const targetEntity = targetEntityRef.current;
    const entityPos = entityRef.current.position;

    if (stateRef.current === "chase") {
      if (targetEntity) {
        direction.subVectors(
          targetEntity.position, 
          entityPos
        ).normalize();
      }
    } else if (stateRef.current === "flee") {
      if (targetEntity) {
        direction.subVectors(
          entityPos,
          targetEntity.position
        ).normalize();
      }
    } else if (stateRef.current === "explore") {
      direction.copy(randomDirection.normalize());
    }
  });

  return direction;
};

export default useGetDirection;