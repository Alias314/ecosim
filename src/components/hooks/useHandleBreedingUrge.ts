import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../../game/store";

const useHandleBreedingUrge = (id, entityAttributes) => {
  useFrame((_, delta) => {
    if (entityAttributes[id].isAlive === false || entityAttributes[id].maxBreedingUrge <= 0) return;
    entityAttributes[id].maxBreedingUrge -= delta * useGameStore.getState().simulationSpeed;
  });
};

export default useHandleBreedingUrge;