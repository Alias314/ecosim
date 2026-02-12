import { useRef } from "react";
import { wolf } from "../../../constants/entity";
import useEntityMovement from "../../hooks/useEntityMovement";
import useHandleEntityState from "../../hooks/useHandleEntityState";
import useGetDirection from "../../hooks/useGetDirection";
import useHandleDeadEntity from "../../hooks/useHandleDeadEntity";
import useHandleEatEntity from "../../hooks/useHandleEatEntity";
import useHandleHunger from "../../hooks/useHandleHunger";

function Wolf({
  id,
  position,
  entityAttributesRef,
  heightMap,
}) {
  const stateRef = useRef("explore");
  const meshRef = useRef();
  const targetEntityRef = useRef();
  const direction = useGetDirection(meshRef, targetEntityRef, stateRef);

  useHandleDeadEntity(
    id,
    meshRef,
    entityAttributesRef.current.wolf,
  )

  useHandleEntityState(
    meshRef,
    wolf.detectionRange, 
    null, 
    entityAttributesRef.current.rabbit,
    targetEntityRef, 
    stateRef
  );

  useHandleEatEntity(
    id,
    wolf.size, 
    targetEntityRef,
    entityAttributesRef.current.wolf,
    entityAttributesRef.current.rabbit
  );

  useHandleHunger(
    id,
    entityAttributesRef.current.wolf
  );

  useEntityMovement(
    id,
    meshRef, 
    direction, 
    wolf.speed,
    wolf.speedOnWater,
    wolf.size,
    heightMap,
    entityAttributesRef.current.wolf,
  );

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[wolf.size]} />
      <meshStandardMaterial color={"#525252"} />
    </mesh>
  );
};

export default Wolf;