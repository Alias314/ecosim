import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import useGetRandomDirection from './useGetRandomDirection';
import { getChaseDirection } from '../../utils/entity';
import { getAlignmentDirection, getCohesionDirection, getFleeDirection, getSeparationDirection } from '../../utils/boids';

const useGetDirection = (id, entityAttributes, predatorAttributes, entityRef, targetEntityRef, stateRef) => {
  const direction = new Vector3();
  const randomDirection = useGetRandomDirection(200);
  
  useFrame(() => {
    const targetEntity = targetEntityRef.current;
    const entityPos = entityRef.current.position;

    if (stateRef.current === "chase") {
      const alignDirection = getAlignmentDirection(id, entityAttributes);
      const separationDirection = getSeparationDirection(id, entityAttributes);
      alignDirection.sub(direction);

      direction.sub(alignDirection);
      direction.add(separationDirection);
      direction.add(getChaseDirection(entityPos, targetEntity.position)).normalize();
    } else if (stateRef.current === "flee") {
      const alignDirection = getAlignmentDirection(id, entityAttributes);
      const cohesionDirection = getCohesionDirection(id, entityAttributes);
      const separationDirection = getFleeDirection(id, entityAttributes, predatorAttributes);

      alignDirection.sub(direction);
      cohesionDirection.sub(entityPos);

      direction.sub(alignDirection).multiplyScalar(10);
      direction.sub(cohesionDirection);
      direction.add(separationDirection).normalize();
    } else if (stateRef.current === "mating") {
      direction.copy(getChaseDirection(entityPos, targetEntity.position));
    } else if (stateRef.current === "explore") {
      if (direction.length() === 0) direction.copy(randomDirection);
      const alignDirection = getAlignmentDirection(id, entityAttributes);
      const cohesionDirection = getCohesionDirection(id, entityAttributes);
      const separationDirection = getSeparationDirection(id, entityAttributes);

      alignDirection.sub(direction);
      cohesionDirection.sub(entityPos);

      direction.sub(alignDirection).multiplyScalar(10);
      direction.sub(cohesionDirection);
      direction.add(separationDirection).normalize();
    }

    entityAttributes[id].direction.copy(direction);
  });

  return direction;
};

export default useGetDirection;