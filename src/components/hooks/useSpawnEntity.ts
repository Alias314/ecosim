import { useEffect } from "react";
import { getRandomCoordinate } from "../../utils/math";

const useSpawnEntity = (setRabbits, setWolves, rabbitStatusRef) => {
  useEffect(() => {
    const tempRabbits = [];
    const tempWolves = [];

    for (let i = 0; i < 200; i++) {
      tempRabbits.push({ 
        id: i,
        position: getRandomCoordinate(10)
      });
      rabbitStatusRef.current[i] = true;
    }

    for (let i = 0; i < 5; i++) {
      tempWolves.push({
        id: i,
        position: getRandomCoordinate(10)
      });
    }

    setRabbits(tempRabbits);
    setWolves(tempWolves);
  }, []);
};

export default useSpawnEntity;