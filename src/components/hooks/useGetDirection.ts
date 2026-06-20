import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import useGetRandomDirection from './useGetRandomDirection';
import { getChaseDirection, isEntityAlive } from '../../utils/entity';
import { getAlignmentDirection, getCohesionDirection, getFleeDirection, getSeparationDirection } from '../../utils/boids';

const useGetDirection = (id, entityAttributes, predatorAttributes, entityRef, targetEntityRef, stateRef) => {
  const direction = new Vector3();
  const randomDirection = useGetRandomDirection(200);
  
  useFrame(() => {
    if (!isEntityAlive(id, entityAttributes)) return;
    const targetEntity = targetEntityRef.current;
    const entityPos = entityRef.current.position;

    if (stateRef.current === "chase") {
      const separation = getSeparationDirection(id, entityAttributes);
      if (separation.lengthSq() > 0) separation.normalize();

      direction
        .copy(getChaseDirection(entityPos, targetEntity.position))
        .addScaledVector(separation, 0.6)
        .normalize();
    } else if (stateRef.current === "flee") {
      const flee = getFleeDirection(id, entityAttributes, predatorAttributes);
      const separation = getSeparationDirection(id, entityAttributes);
      if (flee.lengthSq() > 0) flee.normalize();
      if (separation.lengthSq() > 0) separation.normalize();

      direction
        .multiplyScalar(0.2)
        .addScaledVector(flee, 2.0)
        .addScaledVector(separation, 0.8)
        .normalize();
    } else if (stateRef.current === "mating") {
      direction.copy(getChaseDirection(entityPos, targetEntity.position));
    } else if (stateRef.current === "explore") {
      if (direction.length() === 0) direction.copy(randomDirection);

      const alignment = getAlignmentDirection(id, entityAttributes);
      const cohesion = getCohesionDirection(id, entityAttributes);
      const separation = getSeparationDirection(id, entityAttributes);

      if (alignment.lengthSq() > 0) alignment.normalize();
      if (cohesion.lengthSq() > 0) cohesion.sub(entityPos).normalize();
      if (separation.lengthSq() > 0) separation.normalize();

      direction
        .multiplyScalar(0.5)
        .addScaledVector(separation, 1.5)
        .addScaledVector(alignment, 0.5)
        .addScaledVector(cohesion, 0.3)
        .normalize();
    }

    entityAttributes[id].direction.copy(direction);
  });

  return direction;
};

export default useGetDirection;