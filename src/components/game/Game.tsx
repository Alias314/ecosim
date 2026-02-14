import { useRef, useState } from "react";
import Scene from "../canvas/scene/Scene";
import { generateHeightMap } from '../../utils/terrain';
import { Canvas } from "@react-three/fiber";
import { Label } from "radix-ui";
import Sidebar from "../sidebar/Sidebar";

const Game = () => {
  return (
    <div className="w-screen h-screen flex bg-gradient-to-t from-[#1F1F1F] via-[#363636] via-50% to-[#5C5C5C]">
      <Canvas camera={{ position: [5, 6, 11] }} shadows>
        <Scene />
      </Canvas>

      <Sidebar />
    </div>
  );
};

export default Game;
