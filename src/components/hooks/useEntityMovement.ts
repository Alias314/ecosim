import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { handleOutOfBounds } from "../../utils/canvas";
import { getTerrainIndex, isOnWater } from "../../utils/canvas";
import { useGameStore } from "../../game/store";
import { boundary } from "../../constants/terrain";
import useGetNewDirection from "./useGetNewDirection";
import useStartDelay from "./useStartDelay";

const useEntityMovement = (
  id,
  bodyRef, 
  terrainRef, 
  rabbitStatusRef, 
  rabbitPositionsRef,
  heightMap,
  meshSize, 
  speed
) => {
  const terrainSize = useGameStore((state) => state.terrainSize);
  const terrainHeight = useGameStore((state) => state.terrainHeight);
  const direction = useGetNewDirection(200);
  const delay = useStartDelay(0, 10000);
  const nextPos = new Vector3();

  useFrame(() => {
    if (!bodyRef.current || !terrainRef.current || !delay.current) return;

    if (!rabbitStatusRef.current[id]) {
      nextPos.set(0, -10, 0);
      bodyRef.current.setNextKinematicTranslation(nextPos);
      return;
    }

    const bodyPos = bodyRef.current.translation();
    nextPos.set(
      bodyPos.x + direction.current.x * speed,
      bodyPos.y,
      bodyPos.z + direction.current.z * speed,
    );
    handleOutOfBounds(nextPos, boundary);

    const index = getTerrainIndex(nextPos, terrainSize);
    const nextY = Math.max(0.4, heightMap[index.z][index.x]);
    if (isOnWater(nextY)) return;

    nextPos.set(nextPos.x, nextY * terrainHeight + meshSize, nextPos.z);
    bodyRef.current.setNextKinematicTranslation(nextPos);
    rabbitPositionsRef.current[id] = nextPos.clone();
  });
};

export default useEntityMovement;
