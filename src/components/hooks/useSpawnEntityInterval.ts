import { useFrame } from '@react-three/fiber'
import { useRef } from 'react';
import { getSpawnCoordinate } from '../../utils/canvas';
import { getDeadEntityId } from '../../utils/entity';
import { useGameStore } from '../../game/store';

const useSpawnEntityInterval = (
  entity,
  entityAttributes,
  heightMap
) => {
  const accumulator = useRef(0);

  useFrame((_, delta) => {
    const store = useGameStore.getState();
    if (store.simulationSpeed === 0) return;

    accumulator.current += delta * store.simulationSpeed * store.plantSpawnRate;

    while (accumulator.current >= 1) {
      accumulator.current -= 1;

      const id = getDeadEntityId(entityAttributes);
      if (id === null) {
        accumulator.current = 0;
        break;
      }

      const startPos = getSpawnCoordinate(entity.size, 10, 512, heightMap);
      entityAttributes[id].isAlive = true;
      entityAttributes[id].position = startPos;
      entityAttributes[id].hungerCapacity = entity.hungerCapacity;
    }
  });
};

export default useSpawnEntityInterval;
