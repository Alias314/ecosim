import { useEffect } from "react";
import { getRandomCoordinate } from "../../utils/math";
import { getSpawnCoordinate, getTerrainIndex } from "../../utils/canvas";
import { bush, rabbit, wolf } from "../../constants/entity";

const useSpawnEntity = (
  amountRabbits,
  amountWolves,
  amountBush,
  setRabbits, 
  setWolves,
  setBushes,
  entityAttributesRef,
  heightMap
) => {
  useEffect(() => {
    const tempRabbits = [];
    const tempWolves = [];
    const tempBush = [];

    for (let i = 0; i < amountRabbits; i++) {
      const startPos = getSpawnCoordinate(10, heightMap).clone();
      
      tempRabbits.push({ 
        id: i,
        position: startPos
      });

      entityAttributesRef.current.rabbit[i] = {
        id: i,
        position: startPos,
        isAlive: true,
        hungerCapacity: rabbit.hungerCapacity
      }
    }

    for (let i = 0; i < amountWolves; i++) {
      const startPos = getSpawnCoordinate(10, heightMap).clone();
      
      tempWolves.push({
        id: i,
        position: startPos
      });

      entityAttributesRef.current.wolf[i] = {
        id: i,
        position: startPos,
        isAlive: true,
        hungerCapacity: wolf.hungerCapacity
      }
    }

    for (let i = 0; i < amountBush; i++) {
      const startPos = getSpawnCoordinate(10, heightMap).clone();
      const terrainIndex = getTerrainIndex(startPos, 512);
      startPos.y = heightMap[terrainIndex.j][terrainIndex.i] * 2 + bush.size;
      
      tempBush.push({
        id: i,
        position: startPos
      });

      entityAttributesRef.current.bush[i] = {
        id: i,
        position: startPos,
        isAlive: true,
      }
    }

    setRabbits(tempRabbits);
    setWolves(tempWolves);
    setBushes(tempBush);
  }, []);
};

export default useSpawnEntity;