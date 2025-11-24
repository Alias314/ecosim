import { useMemo } from "react";
import { PlaneGeometry, Mesh, Color, BufferAttribute } from "three";
import { getTerrainColor, terrainType } from "./terrainUtils";
import Tree from "../entities/Tree";
import { useGameStore } from "../../game/store";

interface TerrainProps {
    terrainRef: React.RefObject<Mesh | null>;
    heightMap: number[][];
}

function Terrain({ 
    terrainRef, 
    heightMap, 
}: TerrainProps) {
  const terrainSize = useGameStore((state) => state.terrainSize);
  const terrainHeight = useGameStore((state) => state.terrainHeight);
  const heightMapSize = useGameStore((state) => state.heightMapSize);
  const geometry = useMemo(() => {
    const geo = new PlaneGeometry(10, 10, terrainSize - 1, terrainSize - 1);
    const colors = new Float32Array(terrainSize * terrainSize * 3);
    const color = new Color();

    for (let i = 0; i < heightMapSize; i++) {
      for (let j = 0; j < heightMapSize; j++) {
        const vertexIndex = j + i * terrainSize;
        let noiseValue = heightMap[i][j];
        
        if (noiseValue <= terrainType.water.maxHeight) color.set(getTerrainColor(noiseValue, terrainType.water));
        else if (noiseValue < terrainType.lowSand.maxHeight) color.set(getTerrainColor(noiseValue, terrainType.lowSand));
        else if (noiseValue < terrainType.highSand.maxHeight) color.set(getTerrainColor(noiseValue, terrainType.highSand));
        else if (noiseValue < terrainType.grass.maxHeight) color.set(getTerrainColor(noiseValue, terrainType.grass));
        else color.set(getTerrainColor(noiseValue, terrainType.tree));
        
        const colorIndex = vertexIndex * 3;
        colors[colorIndex] = color.r;
        colors[colorIndex + 1] = color.g;
        colors[colorIndex + 2] = color.b;
        
        if (noiseValue <= terrainType.water.maxHeight) noiseValue = 0.4;
        const height = noiseValue * terrainHeight;
        geo.attributes.position.setZ(vertexIndex, height);
        geo.attributes.pos
      }
    }

    geo.attributes.position.needsUpdate = true;
    geo.setAttribute("color", new BufferAttribute(colors, 3));
    geo.attributes.color.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [heightMap]);

  return (
    <mesh
      ref={terrainRef}
      position={[5, 0, 5]}
      rotation={[-Math.PI / 2, 0, 0]}
      geometry={geometry}
      receiveShadow
      castShadow
    >
      <meshStandardMaterial vertexColors roughness={1} />
    </mesh>
  )
}

export default Terrain;