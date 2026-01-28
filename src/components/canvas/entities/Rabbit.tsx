import { useEffect, useRef } from "react";
import {
  BallCollider,
  MeshCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { Vector3, Mesh, MathUtils } from "three";
import { useGameStore } from "../../../game/store";
import useStartDelay from "../../hooks/useStartDelay";
import { getDirection, getRandomRadian } from "../../../utils/math";
import useGetNewDirection from "../../hooks/useGetNewDirection";

interface SphereProps {
  terrainRef: React.RefObject<Mesh | null>;
}

function Rabbit({
  id,
  rabbitStatusRef,
  rabbitPositionsRef,
  terrainRef,
  heightMap,
}: SphereProps) {
  const terrainSize = useGameStore((state) => state.terrainSize);
  const bodyRef = useRef<RapierRigidBody | null>(null);
  const direction = useGetNewDirection(200);
  const isOnWater = useRef(true);
  const delay = useStartDelay(0, 10000);
  const newPos = new Vector3();
  const speed = 5;

  useFrame((_, delta) => {
    if (!bodyRef.current || !terrainRef.current || !delay.current) return;

    if (!rabbitStatusRef.current[id]) {
      newPos.set(0, -10, 0);
      bodyRef.current.setNextKinematicTranslation(newPos);
      return;
    }

    const bodyPos = bodyRef.current.translation();
    let nextX = bodyPos.x + direction.current.x * speed;
    let nextZ = bodyPos.z + direction.current.z * speed;

    if (nextX < 0) nextX = 0.01;
    if (nextX > 10) nextX = 9.99;
    if (nextZ < 0) nextZ = 0;
    if (nextZ > 10) nextZ = 9.99;

    const indexX = Math.floor((terrainSize / 10) * nextX);
    const indexZ = Math.floor((terrainSize / 10) * nextZ);
    const nextY =
      heightMap[indexZ][indexX] < 0.4 ? 0.4 : heightMap[indexZ][indexX];
    if (nextY > 0.4) isOnWater.current = false;
    if (nextY <= 0.4 && !isOnWater.current) return;

    newPos.set(nextX, nextY * 4 + 0.05, nextZ);

    bodyRef.current.setNextKinematicTranslation(newPos);

    rabbitPositionsRef.current[id] = newPos.clone();
  });

  return (
    <RigidBody ref={bodyRef} position={[5, 0, 5]} type="kinematicPosition">
      <mesh position={[0, 0, 0]} visible={rabbitStatusRef.current[id]}>
        <icosahedronGeometry args={[0.05, 2]} />
        <meshStandardMaterial color={"red"} />
      </mesh>

      <BallCollider args={[1]} />
    </RigidBody>
  );
}

export default Rabbit;
