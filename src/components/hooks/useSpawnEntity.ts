import { useEffect } from "react";

const useSpawnEntity = (setRabbits, setWolves, rabbitStatusRef) => {
  useEffect(() => {
    const tempRabbits = [];
    const tempWolves = [];

    for (let i = 0; i < 100; i++) {
      tempRabbits.push({ id: i });
      rabbitStatusRef.current[i] = true;
    }

    for (let i = 0; i < 1; i++) {
      tempWolves.push(i);
    }

    setRabbits(tempRabbits);
    setWolves(tempWolves);
  }, []);
};

export default useSpawnEntity;