import { useFrame } from '@react-three/fiber'
import { bush } from '../../constants/entity';
import { getSpawnCoordinate, getTerrainIndex } from '../../utils/canvas';

const useSpawnEntityInterval = (
  entityAttributes,
  heightMap
) => {
  useFrame(() => {
    if (Math.random() > 0.5) return;
    
    const length = entityAttributes.length;
    const startPos = getSpawnCoordinate(10, heightMap).clone();
    const terrainIndex = getTerrainIndex(startPos, 512);
    startPos.y = heightMap[terrainIndex.j][terrainIndex.i] * 2 + bush.size;

    entityAttributes.push({
      id: length,
      position: startPos,
      isAlive: true
    });
  });
};

export default useSpawnEntityInterval;