import { useFrame } from '@react-three/fiber';
import React, { useEffect } from 'react'
import { Vector3 } from 'three';
import { terrainType } from '../../constants/terrain';
import { handleOutOfBounds, getTerrainIndex, isOnWater } from '../../utils/canvas';

const useEntityMovement = (
  id, 
  entityMeshRef, 
  direction, 
  speed,
  speedOnWater,
  heightMap, 
  entityAttributesRef
) => {
  const nextPos = new Vector3();
  
  useFrame(() => {
    if (!entityAttributesRef.current[id].isAlive) return;

    const entityPos = entityMeshRef.current.position;
    
    const terrainIndex = getTerrainIndex(nextPos, 512);
    const height = heightMap[terrainIndex.j][terrainIndex.i];
    nextPos.y = Math.max(
      terrainType.water.maxHeight, 
      heightMap[terrainIndex.j][terrainIndex.i]
    );
    nextPos.y = nextPos.y * 4 + 0.05;
    
    const currentSpeed = isOnWater(height) ? speedOnWater : speed;
    nextPos.x = entityPos.x + direction.x * currentSpeed;
    nextPos.z = entityPos.z + direction.z * currentSpeed;
    handleOutOfBounds(nextPos);

    entityPos.copy(nextPos);
    entityAttributesRef.current[id].position = entityPos.clone();
  });
};

export default useEntityMovement;