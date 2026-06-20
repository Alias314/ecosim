import { useFrame } from '@react-three/fiber';

const useHandleEatEntity = (
  id,
  attackRange,
  targetEntityRef,
  originEntityAttributes,
  entityAttributes,
  maxHunger,
  foodValue
) => {
  useFrame(() => {
    const targetEntity = targetEntityRef.current;
    if (!targetEntity || targetEntity.id == null) return;

    const target = entityAttributes[targetEntity.id];
    if (target.isAlive && targetEntity.distance < attackRange) {
      target.isAlive = false;
      originEntityAttributes[id].hungerCapacity = Math.min(
        originEntityAttributes[id].hungerCapacity + foodValue,
        maxHunger
      );
    }
  });
};

export default useHandleEatEntity;