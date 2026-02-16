import { useFrame } from '@react-three/fiber';

const useHandleEatEntity = (
  id,
  attackRange, 
  targetEntityRef,
  originEntityAttributes,
  entityAttributes
) => {
  useFrame(() => {
    const targetEntity = targetEntityRef.current;
    if (!targetEntity) return;

    if (targetEntity.id && targetEntity.distance < attackRange) {
      entityAttributes[targetEntity.id].isAlive = false;
      originEntityAttributes[id].hungerCapacity += 3;
    }
  });
};

export default useHandleEatEntity;