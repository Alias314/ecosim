import { useFrame } from '@react-three/fiber';
import React, { useEffect } from 'react'
import { Vector3 } from 'three';
import { terrainType } from '../../constants/terrain';
import { handleOutOfBounds, getTerrainIndex } from '../../utils/canvas';

const useEntityMovement = (
  id, 
  entityMeshRef, 
  direction, 
  speed, 
  heightMap, 
  entityAttributesRef
) => {
  const nextPos = new Vector3();
  
  useFrame(() => {
    if (!entityAttributesRef.current[id].isAlive) return;

    const entityPos = entityMeshRef.current.position;
    
    nextPos.x = entityPos.x + direction.x * speed;
    nextPos.z = entityPos.z + direction.z * speed;
    handleOutOfBounds(nextPos);
    
    const terrainIndex = getTerrainIndex(nextPos, 512);
    nextPos.y = Math.max(
      terrainType.water.maxHeight, 
      heightMap[terrainIndex.j][terrainIndex.i]
    );
    nextPos.y = nextPos.y * 4 + 0.05;
    
    entityPos.copy(nextPos);
    entityAttributesRef.current[id].position = entityPos.clone();
  });
};

export default useEntityMovement;