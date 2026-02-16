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
import { useFrame } from "@react-three/fiber";
import useHandleBreeding from "../../hooks/useHandleBreeding";

const Rabbit = ({
  id,
  position,
  entityAttributesRef,
  heightMap
}) => {
  const stateRef = useRef("explore");
  const meshRef = useRef();
  const targetEntityRef = useRef();
  
  const direction = useGetDirection(
    id, 
    entityAttributesRef.current.rabbit, 
    entityAttributesRef.current.wolf, 
    meshRef, 
    targetEntityRef, 
    stateRef
  );

  useHandleEntityState(
    id,
    meshRef,
    rabbit.detectionRange,
    entityAttributesRef.current.wolf,
    entityAttributesRef.current.bush,
    entityAttributesRef.current.rabbit,
    targetEntityRef,
    stateRef
  );
  
  useHandleEntityPosition(
    id,
    meshRef,
    entityAttributesRef.current.rabbit
  );
  
  useHandleMovement(
    id,
    meshRef,
    direction,
    rabbit.speed,
    rabbit.speedOnWater,
    rabbit.size,
    heightMap,
    entityAttributesRef.current.rabbit,
  );
  
  useHandleDeadEntity(
    id,
    meshRef, 
    entityAttributesRef.current.rabbit
  );

  useHandleEatEntity(
    id,
    rabbit.size,
    targetEntityRef,
    entityAttributesRef.current.rabbit,
    entityAttributesRef.current.bush
  );

  useHandleHunger(
    id,
    entityAttributesRef.current.rabbit
  );

  // useHandleBreeding(
  //   id,
  //   rabbit,
  //   stateRef,
  //   targetEntityRef,
  //   entityAttributesRef.current.rabbit,
  //   heightMap
  // );

  // useHandleBreedingUrge(
  //   id,
  //   entityAttributesRef.current.rabbit,
  // );

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[rabbit.size]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};

export default Rabbit;