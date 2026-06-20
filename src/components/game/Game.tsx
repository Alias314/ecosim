import Scene from "../canvas/scene/Scene";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { defaultTerrainAttributes, terrainType } from "../../constants/terrain";
import { generateHeightMap } from "../../utils/terrain";
import { getRandomIntAtRange } from "../../utils/math";
import { getTerrainIndex, isOnWater } from "../../utils/canvas";
import { bush } from "../../constants/entity";
import {
  getEntityPool,
  initSpawnEntity,
  killAllEntities,
} from "../../utils/entity";
import { useGameStore } from "../../game/store";
import Header from "../header/Header";
import { ChartLineMultiple } from "../chart/ChartLineMultiple";
import ToolBar from "../toolbar/Toolbar";
import Settings from "../settings/Settings";

const Game = () => {
  const entityAttributesRef = useRef(getEntityPool(500));
  const [terrainAttributes, setTerrainAttributes] = useState(
    defaultTerrainAttributes,
  );

  useEffect(() => {
    const { preyCount, predatorCount, plantCount } = useGameStore.getState();
    initSpawnEntity(
      preyCount,
      predatorCount,
      plantCount,
      entityAttributesRef.current,
      terrainAttributes.heightMap,
    );
  }, []);

  useEffect(() => {
    const heightMap = terrainAttributes.heightMap;
    const terrainHeight = useGameStore.getState().terrainHeight;

    entityAttributesRef.current.bush.forEach((b) => {
      if (!b.isAlive) return;
      const index = getTerrainIndex(b.position, defaultTerrainAttributes.size);
      const rawHeight = heightMap[index.j][index.i];

      if (isOnWater(rawHeight)) {
        b.isAlive = false;
        return;
      }

      b.position.y = rawHeight * terrainHeight + bush.size;
    });
  }, [terrainAttributes]);

  const handleSpawn = () => {
    const { preyCount, predatorCount, plantCount, resetPopulationHistory } =
      useGameStore.getState();
    resetPopulationHistory();
    killAllEntities(entityAttributesRef.current);
    initSpawnEntity(
      preyCount,
      predatorCount,
      plantCount,
      entityAttributesRef.current,
      terrainAttributes.heightMap,
    );
  };

  const handleRegenerateTerrain = () => {
    const newAttributes = {
      ...defaultTerrainAttributes,
      seed: getRandomIntAtRange(100000, 999999),
    };
    newAttributes.heightMap = generateHeightMap({ terrainAttributes: newAttributes });
    setTerrainAttributes(newAttributes);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="w-full h-full flex">
        <div className="flex-1 relative m-4 bg-white border-2 rounded-xl">
          <Canvas camera={{ position: [5, 9, 10.3] }} shadows>
            <Scene
              entityAttributes={entityAttributesRef.current}
              terrainAttributes={terrainAttributes}
            />
          </Canvas>
          <ToolBar
            onSpawn={handleSpawn}
            onRegenerateTerrain={handleRegenerateTerrain}
          />
        </div>

        <div className="w-2xl flex flex-col gap-4 m-4 ml-0">
          <ChartLineMultiple />
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default Game;
