import { useFrame } from '@react-three/fiber';
import { getNearestEntity } from '../../utils/entity';

const useHandleKillInRange = (
  attackRange, 
  entityRef, 
  entityAttributesRef
) => {
  useFrame(() => {
    const entityPos = entityRef.current.position;
    const nearestEntity = getNearestEntity(entityPos, entityAttributesRef);

    if (nearestEntity.id && nearestEntity.distance < attackRange) {
      entityAttributesRef.current[nearestEntity.id].isAlive = false;
      entityAttributesRef.current[nearestEntity.id].position.set(0, -3, 0);
    }
  });
};

export default useHandleKillInRange;