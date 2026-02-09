import { useFrame } from '@react-three/fiber';
import React, { useEffect } from 'react'

const useHandleDeadEntity = (id, meshRef, entityAttributesRef) => {
  useFrame(() => {
    if (!entityAttributesRef.current[id].isAlive) {
      const entityPos = meshRef.current.position;
      entityPos.set(0, -10, 0);
    }
  })
};

export default useHandleDeadEntity;