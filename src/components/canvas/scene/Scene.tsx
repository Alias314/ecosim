import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import useSpawnEntity from "../../hooks/useSpawnEntity";
import Rabbit from "../entities/Rabbit";
import Wolf from "../entities/Wolf";
import Terrain from "../terrain/Terrain";

const Scene = ({ heightMap }) => {
  const terrainRef = useRef(null);
  const [rabbits, setRabbits] = useState([]);
  const [wolves, setWolves] = useState([]);
  const rabbitsAttributeRef = useRef({});
  const wolvesAttributeRef = useRef({});

  useSpawnEntity(
    200, 
    5, 
    setRabbits, 
    setWolves, 
    rabbitsAttributeRef, 
    wolvesAttributeRef,
    heightMap
  );

  return (
    <Canvas camera={{ position: [12.5, 9, 12.5] }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[15, 10, -15]} intensity={2} castShadow />
      <OrbitControls />

      <Terrain terrainRef={terrainRef} heightMap={heightMap} />

      {rabbits.map((rabbit) => (
        <Rabbit
          key={rabbit.id}
          id={rabbit.id}
          position={rabbit.position}
          rabbitsAttributeRef={rabbitsAttributeRef}
          wolvesAttributeRef={wolvesAttributeRef}
          heightMap={heightMap}
        />
      ))}

      {wolves.map((wolf) => (
        <Wolf
          key={wolf.id}
          id={wolf.id}
          position={wolf.position}
          rabbitsAttributeRef={rabbitsAttributeRef}
          wolvesAttributeRef={wolvesAttributeRef}
          heightMap={heightMap}
        />
      ))}
    </Canvas>
  );
};

export default Scene;
