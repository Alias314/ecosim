import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { handleOutOfBounds } from "../../utils/canvas";
import { getTerrainIndex, isOnWater } from "../../utils/canvas";
import { useGameStore } from "../../game/store";
import { boundary } from "../../constants/terrain";
import useGetNewDirection from "./useGetNewDirection";
import useStartDelay from "./useStartDelay";

const ENTER_RADIUS = 1.0;
const EXIT_RADIUS = 1.6;
const RUN_SPEED_FACTOR = 1.15;
const BOUNDARY_OFFSET = 0.011;


const useEntityMovement = (
  id,
  bodyRef, 
  terrainRef, 
  rabbitStatusRef, 
  rabbitPositionsRef,
  wolfPositionsRef,
  heightMap,
  meshSize, 
  speed
) => {
  const terrainSize = useGameStore((state) => state.terrainSize);
  const terrainHeight = useGameStore((state) => state.terrainHeight);
  const direction = useGetNewDirection(200);
  const delay = useStartDelay(0, 0);
  const nextPos = new Vector3();
  const moveVec = new Vector3();
  const statusRef = { current: "explore" as "explore" | "run"};

  useFrame(() => {
    if (!bodyRef.current || !terrainRef.current || !delay.current) return;

    if (!rabbitStatusRef.current[id]) {
      nextPos.set(0, -10, 0);
      bodyRef.current.setNextKinematicTranslation(nextPos);
      return;
    }

    const bodyPos = bodyRef.current.translation();

    //pamilngon harani na wolf
    let minDistSq= Infinity;
    let nearestWolf: Vector3 | null = null;
    for(const wID in wolfPositionsRef.current) {
      const wPos = wolfPositionsRef.current[wID];
      if(!wPos) continue;
      const dx = wPos.x - bodyPos.x;
      const dz = wPos.z- bodyPos.z;
      const distSq = dx * dx + dz * dz;

      if(distSq < minDistSq){
        minDistSq = distSq;
        nearestWolf = wPos;
      }
    }

    // Hysteresis transitions
    if(statusRef.current === "explore" && minDistSq < ENTER_RADIUS * ENTER_RADIUS){
      statusRef.current = "run";
    }
    else if(statusRef.current === "run" && minDistSq > EXIT_RADIUS * EXIT_RADIUS){
      statusRef.current = "explore";
    }

    //pili movement vector
    if(statusRef.current ==="run" && nearestWolf){
      moveVec.set(bodyPos.x - nearestWolf.x, 0, bodyPos.z - nearestWolf.z).normalize();
    }else{
      moveVec.set(direction.current.x, 0, direction.current.z).normalize();
    }


    //boundary detection
    if(bodyPos.x <= boundary.x.min + BOUNDARY_OFFSET && moveVec.x < 0){
      moveVec.x = Math.abs(moveVec.x);
    }
    if(bodyPos.x >= boundary.x.max - BOUNDARY_OFFSET && moveVec.x > 0){
      moveVec.x = -Math.abs(moveVec.x);
    }
    if(bodyPos.z <= boundary.z.min + BOUNDARY_OFFSET && moveVec.z < 0){
      moveVec.z = Math.abs(moveVec.z);
    }
    if(bodyPos.z >= boundary.z.max - BOUNDARY_OFFSET && moveVec.z > 0){
      moveVec.z = -Math.abs(moveVec.z);
    }

    // randomness to unstick from corners
    if(statusRef.current === "run"){
      moveVec.x += direction.current.x * 0.2;
      moveVec.z += direction.current.z * 0.3;
      moveVec.normalize();
    }


    const step = speed * (statusRef.current === "run" ? RUN_SPEED_FACTOR : 1.0);

    nextPos.set(
      bodyPos.x + moveVec.x * step,
      bodyPos.y,
      bodyPos.z + moveVec.z * step,
    );
    handleOutOfBounds(nextPos, boundary);

    const index = getTerrainIndex(nextPos, terrainSize);
    const nextY = Math.max(0.4, heightMap[index.z][index.x]);
    // if (isOnWater(nextY)) return;

    nextPos.set(nextPos.x, nextY * terrainHeight + meshSize, nextPos.z);
    bodyRef.current.setNextKinematicTranslation(nextPos);
    rabbitPositionsRef.current[id] = nextPos.clone();
  });
};

export default useEntityMovement;
