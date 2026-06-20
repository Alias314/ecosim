import { useRef } from "react";
import { rabbit } from "../../../constants/entity";
import useGetDirection from "../../hooks/useGetDirection";
import useHandleDeadEntity from "../../hooks/useHandleDeadEntity";
import useHandleEntityState from "../../hooks/useHandleEntityState";
import useHandleHunger from "../../hooks/useHandleHunger";
import useHandleEatEntity from "../../hooks/useHandleEatEntity";
import useHandleEntityPosition from "../../hooks/useHandleEntityPosition";
import useHandleMovement from "../../hooks/useHandleMovement";
import useHandleBreedingUrge from "../../hooks/useHandleBreedingUrge";
import useHandleBreeding from "../../hooks/useHandleBreeding";
import { Outlines } from "@react-three/drei";

const Rabbit = ({
  id,
  position,
  entityAttributes,
  heightMap
}) => {
  const stateRef = useRef("explore");
  const meshRef = useRef();
  const targetEntityRef = useRef();
  
  const direction = useGetDirection(
    id, 
    entityAttributes.rabbit, 
    entityAttributes.wolf, 
    meshRef, 
    targetEntityRef, 
    stateRef
  );

  useHandleEntityState(
    id,
    meshRef,
    rabbit.detectionRange,
    entityAttributes.wolf,
    entityAttributes.bush,
    entityAttributes.rabbit,
    targetEntityRef,
    stateRef
  );
  
  useHandleEntityPosition(
    id,
    meshRef,
    entityAttributes.rabbit
  );
  
  useHandleMovement(
    id,
    meshRef,
    direction,
    rabbit.speed,
    rabbit.speedOnWater,
    rabbit.size,
    heightMap,
    entityAttributes.rabbit,
  );
  
  useHandleDeadEntity(
    id,
    meshRef, 
    entityAttributes.rabbit
  );

  useHandleEatEntity(
    id,
    rabbit.size + 0.02,
    targetEntityRef,
    entityAttributes.rabbit,
    entityAttributes.bush
  );

  useHandleHunger(
    id,
    entityAttributes.rabbit
  );

  useHandleBreeding(
    id,
    rabbit,
    stateRef,
    targetEntityRef,
    entityAttributes.rabbit,
    heightMap
  );

  useHandleBreedingUrge(
    id,
    entityAttributes.rabbit,
  );

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[rabbit.size]} />
      <meshBasicMaterial color={"#3b82f6"} />
      <Outlines thickness={1} color={"black"} />
    </mesh>
  );
};

export default Rabbit;