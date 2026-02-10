import { useRef } from "react";
import { wolf } from "../../../constants/entity";
import useEntityMovement from "../../hooks/useEntityMovement";
import useHandleEntityState from "../../hooks/useHandleEntityState";
import useGetDirection from "../../hooks/useGetDirection";
import useHandleKillInRange from "../../hooks/useHandleKillInRange";
import useHandleDeadEntity from "../../hooks/useHandleDeadEntity";

function Wolf({
  id,
  position,
  rabbitsAttributeRef,
  wolvesAttributeRef,
  heightMap,
}) {
  const stateRef = useRef("explore");
  const meshRef = useRef();
  const direction = useGetDirection(meshRef, rabbitsAttributeRef, stateRef);

  useHandleDeadEntity(
    id,
    meshRef,
    wolvesAttributeRef,
  )

  useHandleEntityState(
    meshRef,
    wolf.type, 
    wolf.detectionRange, 
    rabbitsAttributeRef, 
    stateRef
  );

  useHandleKillInRange(
    wolf.attackRange, 
    meshRef, 
    rabbitsAttributeRef
  );

  useEntityMovement(
    id,
    meshRef, 
    direction, 
    wolf.speed, 
    heightMap,
    wolvesAttributeRef,
  );

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[wolf.size, 2]} />
      <meshStandardMaterial color={"black"} />
    </mesh>
  );
};

export default Wolf;