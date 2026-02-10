import { useFrame } from '@react-three/fiber';
import React from 'react'
import { getNearestEntity } from '../../utils/entity';

const useHandleEntityState = (
  entityMeshRef,
  entityType,
  entityDetectionRange,
  entityAttributesRef,
  stateRef
) => {  
  useFrame(() => {
    const entityPos = entityMeshRef.current.position;

    const nearestEntity = getNearestEntity(entityPos, entityAttributesRef);

    if (nearestEntity.distance < entityDetectionRange && entityType === "predator") {
      stateRef.current = "chase";
    } else if (nearestEntity.distance < entityDetectionRange && entityType === "prey") {
      stateRef.current = "flee"
    } else {
      stateRef.current = "explore";
    } 
  });
};

export default useHandleEntityState;