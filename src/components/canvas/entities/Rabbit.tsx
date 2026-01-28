import { useEffect, useRef } from "react";
import {
  BallCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import useEntityMovement from "../../hooks/useEntityMovement";

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
  const bodyRef = useRef<RapierRigidBody | null>(null);
  const speed = 5;
  const meshSize = 0.05;

  useEntityMovement(
    id, 
    bodyRef, 
    terrainRef, 
    rabbitStatusRef, 
    rabbitPositionsRef, 
    heightMap, 
    meshSize, 
    speed
  );

  return (
    <RigidBody ref={bodyRef} position={[5, 0, 5]} type="kinematicPosition">
      <mesh position={[0, 0, 0]} visible={rabbitStatusRef.current[id]}>
        <icosahedronGeometry args={[meshSize, 2]} />
        <meshStandardMaterial color={"red"} />
      </mesh>

      <BallCollider args={[1]} />
    </RigidBody>
  );
}

export default Rabbit;
