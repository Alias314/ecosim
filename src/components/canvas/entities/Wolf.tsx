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
import { Outlines } from "@react-three/drei";

function Wolf({ id, position, entityAttributes, heightMap }) {
  const stateRef = useRef("explore");
  const meshRef = useRef();
  const targetEntityRef = useRef();

  const direction = useGetDirection(
    id,
    entityAttributes.wolf,
    null,
    meshRef,
    targetEntityRef,
    stateRef,
  );

  useHandleEntityState(
    id,
    meshRef,
    wolf.detectionRange,
    null,
    entityAttributes.rabbit,
    entityAttributes.wolf,
    targetEntityRef,
    stateRef,
  );

  useHandleEntityPosition(id, meshRef, entityAttributes.wolf);

  useHandleMovement(
    id,
    meshRef,
    direction,
    wolf.speed,
    wolf.speedOnWater,
    wolf.size,
    heightMap,
    entityAttributes.wolf,
  );

  useHandleDeadEntity(id, meshRef, entityAttributes.wolf);

  useHandleEatEntity(
    id,
    wolf.size + 0.02,
    targetEntityRef,
    entityAttributes.wolf,
    entityAttributes.rabbit,
  );

  useHandleHunger(id, entityAttributes.wolf);

  useHandleBreeding(
    id,
    wolf,
    stateRef,
    targetEntityRef,
    entityAttributes.wolf,
    heightMap,
  );

  useHandleBreedingUrge(id, entityAttributes.wolf);

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[wolf.size]} />
      <meshBasicMaterial color={"#ef4444"} />
      <Outlines thickness={1} color={"black"} />
    </mesh>
  );
}

export default Wolf;
