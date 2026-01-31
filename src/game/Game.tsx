import { useCallback, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { generateHeightMap } from "../components/canvas/terrain/terrainUtils";
import Terrain from "../components/canvas/terrain/Terrain";
import GameSidebar from "./GameSidebar";
import Rabbit from "../components/canvas/entities/Rabbit";
import Wolf from "../components/canvas/entities/Wolf";
import useSpawnEntity from "../components/hooks/useSpawnEntity";

function Game() {
  const terrainRef = useRef(null);
  const [heightMap, setHeightMap] = useState(generateHeightMap());
  const [rabbits, setRabbits] = useState([]);
  const [wolves, setWolves] = useState([]);
  const rabbitStatusRef = useRef({});
  const rabbitPositionsRef = useRef({});

  const generateNewHeightMap = () => {
    setHeightMap(generateHeightMap());
  };

  useSpawnEntity(setRabbits, setWolves, rabbitStatusRef, rabbitPositionsRef);

  return (
    <div className="w-screen h-screen absolute flex items-start justify-start bg-neutral-100">
      <Canvas camera={{ position: [12.5, 9, 12.5] }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[15, 10, -15]} intensity={2} castShadow />
        <OrbitControls />

        <Physics gravity={[0, 0, 0]}>
          <Terrain terrainRef={terrainRef} heightMap={heightMap} />

          {rabbits.map((rabbit) => (
            <Rabbit
              key={rabbit.id}
              id={rabbit.id}
              position={rabbit.position}
              rabbitStatusRef={rabbitStatusRef}
              rabbitPositionsRef={rabbitPositionsRef}
              terrainRef={terrainRef}
              heightMap={heightMap}
            />
          ))}

          {wolves.map((wolf) => (
            <Wolf
              key={wolf.id}
              position={wolf.position}
              rabbitStatusRef={rabbitStatusRef}
              rabbitPositionsRef={rabbitPositionsRef}
              terrainRef={terrainRef}
              heightMap={heightMap}
            />
          ))}
        </Physics>
      </Canvas>

      <GameSidebar generateNewHeightMap={generateNewHeightMap} />
    </div>
  );
}

export default Game;
