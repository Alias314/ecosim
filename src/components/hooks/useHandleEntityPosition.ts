import { useFrame } from "@react-three/fiber";

const useHandleEntityPosition = (id, entityRef, entityAttributes) => {
  useFrame(() => {
    if (!entityAttributes[id].isAlive) return;
    entityRef.current.position.copy(entityAttributes[id].position);
  });
};

export default useHandleEntityPosition;