import { useRef } from "react";
import { wolf } from "../../../constants/entity";
import useHandleEntityState from "../../hooks/useHandleEntityState";
import useGetDirection from "../../hooks/useGetDirection";
import useHandleDeadEntity from "../../hooks/useHandleDeadEntity";
import useHandleEatEntity from "../../hooks/useHandleEatEntity";
import useHandleHunger from "../../hooks/useHandleHunger";
import useHandleEntityPosition from "../../hooks/useHandleEntityPosition";
import useHandleMovement from "../../hooks/useHandleMovement";
import useHandleBreedingUrge from "../../hooks/useHandleBreedingUrge";
import useHandleBreeding from "../../hooks/useHandleBreeding";

function Wolf({
  id,
  position,
  entityAttributesRef,
  heightMap,
}) {
  const stateRef = useRef("explore");
  const meshRef = useRef();
  const targetEntityRef = useRef();
  // const direction = useGetDirection(meshRef, targetEntityRef, stateRef);
  
  const direction = useGetDirection(
    id, 
    entityAttributesRef.current.wolf, 
    null,
    meshRef, 
    targetEntityRef, 
    stateRef
  );

  useHandleEntityState(
    id,
    meshRef,
    wolf.detectionRange, 
    null, 
    entityAttributesRef.current.rabbit,
    entityAttributesRef.current.wolf,
    targetEntityRef, 
    stateRef
  );

  useHandleEntityPosition(
    id,
    meshRef,
    entityAttributesRef.current.wolf
  );

  useHandleMovement(
    id,
    meshRef, 
    direction, 
    wolf.speed,
    wolf.speedOnWater,
    wolf.size,
    heightMap,
    entityAttributesRef.current.wolf,
  );

  useHandleDeadEntity(
    id,
    meshRef,
    entityAttributesRef.current.wolf,
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

  // useHandleBreeding(
  //   id,
  //   wolf,
  //   stateRef,
  //   targetEntityRef,
  //   entityAttributesRef.current.wolf,
  //   heightMap
  // );

  // useHandleBreedingUrge(
  //   id,
  //   entityAttributesRef.current.wolf
  // );

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[wolf.size]} />
      <meshStandardMaterial color={"#525252"} />
    </mesh>
  );
};

export default Wolf;