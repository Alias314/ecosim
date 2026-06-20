import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../../game/store';

const useHandleHunger = (id, entityAttributes) => {
  useFrame((_, delta) => {
    const dt = delta * useGameStore.getState().simulationSpeed;
    entityAttributes[id].hungerCapacity -= dt;
    if (entityAttributes[id].hungerCapacity <= 0) entityAttributes[id].isAlive = false;
  });
};

export default useHandleHunger;