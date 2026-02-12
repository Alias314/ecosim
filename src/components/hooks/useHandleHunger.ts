import { useFrame } from '@react-three/fiber';

const useHandleHunger = (id, entityAttributes) => {
  useFrame((_, delta) => {
    entityAttributes[id].hungerCapacity -= delta;
    if (entityAttributes[id].hungerCapacity <= 0) entityAttributes[id].isAlive = false;
  });
};

export default useHandleHunger;