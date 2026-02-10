import { useEffect } from "react";
import { getRandomCoordinate } from "../../utils/math";

const useSpawnEntity = (
  amountRabbits,
  amountWolves,
  setRabbits, 
  setWolves, 
  rabbitsAttributeRef, 
  wolvesAttributeRef
) => {
  useEffect(() => {
    const tempRabbits = [];
    const tempWolves = [];

    for (let i = 0; i < amountRabbits; i++) {
      const startPos = getRandomCoordinate(10);
      
      tempRabbits.push({ 
        id: i,
        position: startPos
      });

      rabbitsAttributeRef.current[i] = {
        id: i,
        position: startPos,
        isAlive: true
      };
    }

    for (let i = 0; i < amountWolves; i++) {
      const startPos = getRandomCoordinate(10);
      
      tempWolves.push({
        id: i,
        position: startPos
      });

      wolvesAttributeRef.current[i] = {
        id: i,
        position: startPos,
        isAlive: true
      };
    }

    setRabbits(tempRabbits);
    setWolves(tempWolves);
  }, []);
};

export default useSpawnEntity;