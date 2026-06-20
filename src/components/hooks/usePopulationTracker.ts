import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useGameStore } from "@/game/store";

const usePopulationTracker = (entityAttributes) => {
  const elapsed = useRef(0);
  const totalTime = useRef(0);
  const interval = 0.2;

  useFrame((_, delta) => {
    elapsed.current += delta;
    totalTime.current += delta;

    if (elapsed.current >= interval) {
      elapsed.current = 0;
      useGameStore.getState().addPopulationSample({
        time: Math.floor(totalTime.current),
        rabbits: entityAttributes.rabbit.filter((rabbit) => rabbit.isAlive).length,
        wolves: entityAttributes.wolf.filter((wolf) => wolf.isAlive).length,
        bushes: entityAttributes.bush.filter((bush) => bush.isAlive).length,
      });
    }
  });
};

export default usePopulationTracker;