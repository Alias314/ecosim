import { useState } from "react";
import Scene from "../canvas/scene/Scene";
import { generateHeightMap } from '../../utils/terrain';
import Sidebar from "../sidebar/Sidebar";

const Game = () => {
  const [heightMap, setHeightMap] = useState(generateHeightMap());

  const generateNewHeightMap = () => {
    setHeightMap(generateHeightMap());
  };

  return (
    <div className="w-screen h-screen">
      <Scene heightMap={heightMap} />
      <Sidebar generateNewHeightMap={generateNewHeightMap} />
    </div>
  );
};

export default Game;
