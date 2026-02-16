import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { terrainType } from '../../constants/terrain';
import { handleOutOfBounds, getTerrainIndex, isOnWater } from '../../utils/canvas';
import { useGameStore } from '../../game/store';

const useHandleMovement = (
  id, 
  entityMeshRef, 
  direction, 
  speed,
  speedOnWater,
  entitySize,
  heightMap, 
  entityAttributes
) => {
  const terrainHeight = useGameStore((state) => state.terrainHeight);
  const nextPos = new Vector3();
  
  useFrame((_, delta) => {
    if (!entityAttributes[id].isAlive) return;

    const entityPos = entityMeshRef.current.position;
    
    const terrainIndex = getTerrainIndex(nextPos, 512);
    // console.log(terrainIndex);
    // return;
    const height = heightMap[terrainIndex.j][terrainIndex.i];
    // console.log(height);
    nextPos.y = Math.max(
      terrainType.water.maxHeight, 
      heightMap[terrainIndex.j][terrainIndex.i]
    );
    nextPos.y = nextPos.y * terrainHeight + entitySize;
    
    const currentSpeed = isOnWater(height) ? speedOnWater : speed;
    nextPos.x = entityPos.x + direction.x * currentSpeed * delta;
    nextPos.z = entityPos.z + direction.z * currentSpeed * delta;
    handleOutOfBounds(nextPos);

    nextPos.lerpVectors(entityPos, nextPos, 0.1);
    // nextPos.multiplyScalar(0.1);
    entityAttributes[id].position = nextPos;
  });
};

export default useHandleMovement;