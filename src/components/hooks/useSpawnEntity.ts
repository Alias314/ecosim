import { useEffect } from "react";
import { getRandomCoordinate } from "../../utils/math";
import { getSpawnCoordinate } from "../../utils/canvas";

const useSpawnEntity = (
  amountRabbits,
  amountWolves,
  setRabbits, 
  setWolves, 
  rabbitsAttributeRef, 
  wolvesAttributeRef,
  heightMap
) => {
  useEffect(() => {
    const tempRabbits = [];
    const tempWolves = [];

    for (let i = 0; i < amountRabbits; i++) {
      const startPos = getSpawnCoordinate(10, heightMap);
      
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
      const startPos = getSpawnCoordinate(10, heightMap);
      
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