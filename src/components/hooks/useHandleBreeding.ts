import { useFrame } from '@react-three/fiber';
import { spawnBabyEntity, spawnEntity } from '../../utils/entity';

const useHandleBreeding = (id, entity, stateRef, targetEntityRef, entityAttributes, heightMap) => {
  useFrame(() => {
    if (stateRef.current === "mating" && targetEntityRef.current.distance < entity.size) {
      entityAttributes[id].maxBreedingUrge = entity.maxBreedingUrge;
      entityAttributes[id].hungerCapacity -= entity.breedingCost;
      spawnBabyEntity(entity, id, entityAttributes);
    }
  });
};

export default useHandleBreeding;