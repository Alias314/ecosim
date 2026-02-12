import { useThree } from '@react-three/fiber';
import { useEffect } from 'react'
import { Vector3 } from 'three';

const CameraController = ({ terrainRef }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    const position = new Vector3(5, 0, 5);
    camera.lookAt(position);
  }, []);

  return null;
};

export default CameraController;