import Scene from "../canvas/scene/Scene";
import { Canvas } from "@react-three/fiber";
import Sidebar from "../sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import { defaultTerrainAttributes } from "../../constants/terrain";
import {
  getEntityPool,
  initSpawnEntity,
  killAllEntities,
} from "../../utils/entity";
import Header from "../header/Header";
import { ChartLineMultiple } from "../chart/ChartLineMultiple";
import ToolBar from "../toolbar/Toolbar";
import Settings from "../settings/Settings";

const Game = () => {
  const entityAttributesRef = useRef(getEntityPool(400));
  const [terrainAttributes, setTerrainAttributes] = useState(
    defaultTerrainAttributes,
  );

  useEffect(() => {
    initSpawnEntity(
      300,
      20,
      200,
      entityAttributesRef.current,
      terrainAttributes.heightMap,
    );
  }, []);

  const handleGenerateTerrain = () => {
    setTerrainAttributes(sliderTerrainAttributes);
  };

  const handleGenerateEntities = () => {
    killAllEntities(entityAttributesRef.current);

    initSpawnEntity(
      150,
      10,
      200,
      entityAttributesRef.current,
      terrainAttributes.heightMap,
    );
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="w-full h-full flex">
        <div className="flex-1 relative m-4 bg-white border-2 rounded-xl">
          <Canvas camera={{ position: [5, 9, 10] }} shadows>
            <Scene
              entityAttributes={entityAttributesRef.current}
              terrainAttributes={terrainAttributes}
            />
          </Canvas>
          <ToolBar />
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