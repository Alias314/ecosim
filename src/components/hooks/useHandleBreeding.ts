import { useFrame } from '@react-three/fiber';
import { rabbit } from '../../constants/entity';
import { spawnBabyEntity, spawnEntity } from '../../utils/entity';

const useHandleBreeding = (id, entity, stateRef, targetEntityRef, entityAttributes, heightMap) => {
  useFrame(() => {
    if (stateRef.current === "mating" && targetEntityRef.current.distance < rabbit.size) {
      entityAttributes[id].maxBreedingUrge = entity.maxBreedingUrge;
      spawnBabyEntity(entity, id, entityAttributes);
    }
  });
};

export default useHandleBreeding;