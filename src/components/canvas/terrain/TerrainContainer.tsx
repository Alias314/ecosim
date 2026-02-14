import terrainContainerVertexShader from '../../shaders/terrainContainer/vertexShader.glsl';
import terrainContainerFragmentShader from '../../shaders/terrainContainer/fragmentShader.glsl';

const TerrainContainer = () => {
  return (
    <mesh
      key={terrainContainerFragmentShader + terrainContainerVertexShader} 
      position={[5, -1, -5]}
      // rotation
    >
      <boxGeometry args={[100, 1, 100]} />
      <shaderMaterial 
        vertexShader={terrainContainerVertexShader}
        fragmentShader={terrainContainerFragmentShader}
      />
    </mesh>
  );
};

export default TerrainContainer;