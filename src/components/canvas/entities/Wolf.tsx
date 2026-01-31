import { useRef } from "react";
import { MathUtils, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useGameStore } from "../../../game/store";

function Wolf({
  position,
  rabbitStatusRef,
  rabbitPositionsRef,
  terrainRef,
  heightMap,
}) {
  const terrainSize = useGameStore((state) => state.terrainSize);
  const rigidBodyRef = useRef<RapierRigidBody | null>(null);
  const isOnWater = useRef(true);
  const newPos = new Vector3(...position);
  const _wolfPos = new Vector3();
  const chaseDirection = new Vector3();
  const speed = 1;

  useFrame(() => {
    if (!rigidBodyRef.current || !terrainRef.current) return;

    _wolfPos.copy(newPos);
    rigidBodyRef.current.setNextKinematicTranslation(newPos);

    const rabbits = rabbitPositionsRef.current;
    const attackRange = 0.1;
    let nearestRabbitId = null;
    let minDistance = Infinity;

    for (const rabbitId in rabbits) {
      if (!rabbits[rabbitId]) continue;

      const rabbitPos = rabbits[rabbitId];
      const distanceSquared = _wolfPos.distanceToSquared(rabbitPos);

      if (distanceSquared < minDistance) {
        nearestRabbitId = rabbitId;
        minDistance = distanceSquared;
      }

      if (distanceSquared < attackRange) {
        rabbitStatusRef.current[rabbitId] = false;
        delete rabbitPositionsRef.current[rabbitId];
      }
    }

    if (nearestRabbitId && rabbits[nearestRabbitId]) {
      chaseDirection.subVectors(rabbits[nearestRabbitId], _wolfPos).normalize();

      const bodyPos = rigidBodyRef.current.translation();
      let nextX = bodyPos.x + chaseDirection.x * speed;
      let nextZ = bodyPos.z + chaseDirection.z * speed;

      if (nextX < 0) nextX = 0.01;
      if (nextX > 10) nextX = 9.99;
      if (nextZ < 0) nextZ = 0;
      if (nextZ > 10) nextZ = 9.99;

      const indexX = Math.floor((terrainSize / 10) * nextX);
      const indexZ = Math.floor((terrainSize / 10) * nextZ);
      const nextY =
        heightMap[indexZ][indexX] < 0.4 ? 0.4 : heightMap[indexZ][indexX];
      // if (nextY > 0.4) isOnWater.current = false;
      // if (nextY <= 0.4 && !isOnWater.current) return;

      newPos.set(nextX, nextY * 4 + 0.05, nextZ);
    }
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
