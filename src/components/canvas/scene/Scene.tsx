import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import useSpawnEntity from "../../hooks/useSpawnEntity";
import Rabbit from "../entities/Rabbit";
import Wolf from "../entities/Wolf";
import Terrain from "../terrain/Terrain";
import Bush from "../entities/Bush";
import CameraController from "./CameraController";

const Scene = ({ 
  rabbits,
  wolves,
  bushes,
  entityAttributesRef,
  heightMap 
}) => {
  const terrainRef = useRef(null);

  return (
    <Canvas camera={{ position: [12.5, 9, 12.5] }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[15, 10, -15]} intensity={2} castShadow />
      <OrbitControls />
      {/* <CameraController terrainRef={terrainRef} /> */}
      <Terrain terrainRef={terrainRef} heightMap={heightMap} />

      {rabbits.map((rabbit) => (
        <Rabbit
          key={rabbit.id}
          id={rabbit.id}
          position={rabbit.position}
          entityAttributesRef={entityAttributesRef}
          heightMap={heightMap}
        />
      ))}

      {wolves.map((wolf) => (
        <Wolf
          key={wolf.id}
          id={wolf.id}
          position={wolf.position}
          entityAttributesRef={entityAttributesRef}
          heightMap={heightMap}
        />
      ))}

      {bushes.map((bush) => (
        <Bush 
          key={bush.id}
          id={bush.id}
          position={bush.position}
          entityAttributesRef={entityAttributesRef}
        />
      ))}
    </Canvas>
  );
};

export default Scene;
