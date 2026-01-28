import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const useEntityMovement = (bodyRef, terrainRef, delay, rabbitStatusRef) => {
  const nextPos = new Vector3();
  
  useFrame((_, delta) => {
    if (!bodyRef.current || !terrainRef.current || !delay.current) return;

    if (!rabbitStatusRef.current[id]) {
      newPos.set(0, -10, 0);
      bodyRef.current.setNextKinematicTranslation(newPos);
      return;
    }

    
  });
};

export default useEntityMovement