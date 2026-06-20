import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { defaultTerrainAttributes, terrainType } from '../../constants/terrain';
import { handleOutOfBounds, getTerrainIndex, isOnWater } from '../../utils/canvas';
import { useGameStore } from '../../game/store';
import { isEntityAlive } from '../../utils/entity';

const useHandleMovement = (
  id,
  entityMeshRef,
  direction,
  speedKey,
  waterSpeedFactor,
  entitySize,
  heightMap,
  entityAttributes
) => {
  const terrainHeight = useGameStore((state) => state.terrainHeight);
  const nextPos = new Vector3();

  useFrame((_, delta) => {
    if (!isEntityAlive(id, entityAttributes)) return;

    const store = useGameStore.getState();
    const dt = delta * store.simulationSpeed;
    const speed = store[speedKey];
    const entityPos = entityMeshRef.current.position;

    const currentIndex = getTerrainIndex(entityPos, defaultTerrainAttributes.size);
    const currentHeight = heightMap[currentIndex.j][currentIndex.i];
    const currentSpeed = isOnWater(currentHeight) ? speed * waterSpeedFactor : speed;

    nextPos.x = entityPos.x + direction.x * currentSpeed * dt;
    nextPos.z = entityPos.z + direction.z * currentSpeed * dt;
    handleOutOfBounds(nextPos);

    nextPos.x = entityPos.x + (nextPos.x - entityPos.x) * 0.1;
    nextPos.z = entityPos.z + (nextPos.z - entityPos.z) * 0.1;

    const groundIndex = getTerrainIndex(nextPos, defaultTerrainAttributes.size);
    const groundHeight = Math.max(
      terrainType.water.maxHeight,
      heightMap[groundIndex.j][groundIndex.i]
    );
    nextPos.y = groundHeight * terrainHeight + entitySize;

    entityAttributes[id].position = nextPos;
  });
};

export default useHandleMovement;
