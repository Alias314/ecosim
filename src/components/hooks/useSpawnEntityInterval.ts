import { useFrame } from '@react-three/fiber'
import { bush, rabbit } from '../../constants/entity';
import { getSpawnCoordinate } from '../../utils/canvas';
import { getDeadEntityId } from '../../utils/entity';

const useSpawnEntityInterval = (
  entity,
  entityAttributes,
  heightMap
) => {
  useFrame(() => {
    const randomNumber = Math.random();
    const id = getDeadEntityId(entityAttributes);
    if (randomNumber > 0.5 || id === null) return; 

    const startPos = getSpawnCoordinate(
      entity.size,
      10, 
      512, 
      heightMap
    );

    entityAttributes[id].isAlive = true;
    entityAttributes[id].position = startPos;
    entityAttributes[id].hungerCapacity = entity.hungerCapacity;
  });
};

export default useSpawnEntityInterval;