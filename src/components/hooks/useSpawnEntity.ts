import { useEffect } from "react";

const useSpawnEntity = (setRabbits, setWolves, rabbitStatusRef, rabbitPositionRef) => {
  useEffect(() => {
    const tempRabbits = [];
    const tempWolves = [];

    for (let i = 0; i < 200; i++) {
      tempRabbits.push({ id: i });
      rabbitStatusRef.current[i] = true;
    }

    for (let i = 0; i < 2; i++) {
      tempWolves.push(i);
    }

    setRabbits(tempRabbits);
    setWolves(tempWolves);
  }, []);
};

export default useSpawnEntity;