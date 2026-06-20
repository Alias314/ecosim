import { useFrame } from "@react-three/fiber";
import { isEntityAlive } from "../../utils/entity";

const useHandleEntityPosition = (id, entityRef, entityAttributes) => {
  useFrame(() => {
    if (!isEntityAlive(id, entityAttributes)) return;
    entityRef.current.position.copy(entityAttributes[id].position);
  });
};

export default useHandleEntityPosition;