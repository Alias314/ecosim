import { useRef } from "react";
import { MathUtils, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useGameStore } from "../../../game/store";
import { boundary } from "../../../constants/terrain";

function Wolf({
  id,
  position,
  rabbitStatusRef,
  rabbitPositionsRef,
  wolfPositionsRef,
  terrainRef,
  heightMap,
}) {
  const terrainSize = useGameStore((state) => state.terrainSize);
  const rigidBodyRef = useRef<RapierRigidBody | null>(null);
  const isOnWater = useRef(true);
  const newPos = new Vector3(...position);
  const _wolfPos = new Vector3();
  const chaseDirection = new Vector3();
  const speed = 0.05;
  const BOUNDARY_OFFSET = 0.011;


  useFrame(() => {
    if (!rigidBodyRef.current || !terrainRef.current) return;

    const bodyPos = rigidBodyRef.current.translation();
    _wolfPos.set(bodyPos.x, bodyPos.y, bodyPos.z);
    

    const rabbits = rabbitPositionsRef.current;
    const attackRange = 0.1;
    const attackRangeSq = attackRange * attackRange;
    let nearestRabbitId: string | null = null;
    let minDistance = Infinity;

    for (const rabbitId in rabbits) {
      if (!rabbits[rabbitId]) continue;

      const rabbitPos = rabbits[rabbitId];
      const distanceSquared = _wolfPos.distanceToSquared(rabbitPos);

      if (distanceSquared < minDistance) {
        nearestRabbitId = rabbitId;
        minDistance = distanceSquared;
      }

      if (distanceSquared < attackRangeSq) {
        rabbitStatusRef.current[rabbitId] = false;
        delete rabbitPositionsRef.current[rabbitId];
      }
    }

    let nextX = bodyPos.x;
    let nextZ = bodyPos.z;

    if (nearestRabbitId && rabbits[nearestRabbitId]) {
      chaseDirection.subVectors(rabbits[nearestRabbitId], _wolfPos).normalize();


      //boundary aware: avoids push owtward at edges
      if(bodyPos.x <= boundary.x.min + BOUNDARY_OFFSET && chaseDirection.x < 0){
        chaseDirection.x = Math.abs(chaseDirection.x);
      }
      if(bodyPos.x >= boundary.x.max - BOUNDARY_OFFSET && chaseDirection.x > 0){
        chaseDirection.x = -Math.abs(chaseDirection.x);
      }
      if(bodyPos.z <= boundary.z.min + BOUNDARY_OFFSET && chaseDirection.z < 0){
        chaseDirection.z = Math.abs(chaseDirection.z);
      }
      if(bodyPos.z >= boundary.z.max - BOUNDARY_OFFSET && chaseDirection.z > 0){
        chaseDirection.z = -Math.abs(chaseDirection.z);
      }


      nextX = bodyPos.x + chaseDirection.x * speed;
      nextZ = bodyPos.z + chaseDirection.z * speed;

      if (nextX < 0) nextX = 0.01;
      if (nextX > 10) nextX = 9.99;
      if (nextZ < 0) nextZ = 0;
      if (nextZ > 10) nextZ = 9.99;

    }
    const indexX = Math.floor((terrainSize / 10) * nextX);
    const indexZ = Math.floor((terrainSize / 10) * nextZ);
    const nextY = Math.max(0.4, heightMap[indexZ][indexX]);

    newPos.set(nextX, nextY * 4 + 0.05, nextZ);

    rigidBodyRef.current.setNextKinematicTranslation(newPos);
    wolfPositionsRef.current[id] = newPos.clone();
  });

  return (
    <RigidBody ref={rigidBodyRef} position={position} type="kinematicPosition">
      <mesh>
        <icosahedronGeometry args={[0.08, 2]} />
        <meshStandardMaterial color={"black"} />
      </mesh>
    </RigidBody>
  );
}

export default Wolf;
