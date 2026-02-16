import { useFrame } from "@react-three/fiber";

const useHandleBreedingUrge = (id, entityAttributes) => {
  useFrame((_, delta) => {
    if (entityAttributes[id].isAlive === false || entityAttributes[id].maxBreedingUrge <= 0) return;
    entityAttributes[id].maxBreedingUrge -= delta;
  });
};

export default useHandleBreedingUrge;