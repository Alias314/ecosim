import { useFrame } from '@react-three/fiber';
import React, { useEffect } from 'react'
import { Vector3 } from 'three';
import { terrainType } from '../../constants/terrain';
import { handleOutOfBounds, getTerrainIndex, isOnWater } from '../../utils/canvas';
import { useGameStore } from '../../game/store';

const useEntityMovement = (
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
  
  useFrame(() => {
    if (!entityAttributes[id].isAlive) return;

    const entityPos = entityMeshRef.current.position;
    
    const terrainIndex = getTerrainIndex(nextPos, 512);
    const height = heightMap[terrainIndex.j][terrainIndex.i];
    nextPos.y = Math.max(
      terrainType.water.maxHeight, 
      heightMap[terrainIndex.j][terrainIndex.i]
    );
    nextPos.y = nextPos.y * terrainHeight + entitySize;
    
    const currentSpeed = isOnWater(height) ? speedOnWater : speed;
    nextPos.x = entityPos.x + direction.x * currentSpeed;
    nextPos.z = entityPos.z + direction.z * currentSpeed;
    handleOutOfBounds(nextPos);

    nextPos.lerpVectors(entityPos, nextPos, 0.1);
    entityPos.copy(nextPos);
    entityAttributes[id].position = entityPos.clone();
  });
};

export default useEntityMovement;