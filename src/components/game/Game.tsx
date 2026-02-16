import Scene from "../canvas/scene/Scene";
import { Canvas } from "@react-three/fiber";

// 5, 6, 11
// 5, 8, 5

const Game = () => {
  return (
    <div className="w-screen h-screen flex bg-gradient-to-t from-[#1F1F1F] via-[#363636] via-50% to-[#5C5C5C]">
      <Canvas camera={{ position: [5, 8, 5] }} shadows>
        <Scene />
      </Canvas>

      {/* <Sidebar /> */}
    </div>
  );
};

export default Game;
