import { useFrame } from '@react-three/fiber';

const useHandleDeadEntity = (id, meshRef, entityAttributes) => {
  useFrame(() => {
    if (!entityAttributes[id].isAlive) {
      const entityPos = meshRef.current.position;
      entityPos.set(0, -10, 0);
    }
  })
};

export default useHandleDeadEntity;