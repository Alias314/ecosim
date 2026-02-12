import { useRef } from "react";
import { rabbit } from "../../../constants/entity";
import useEntityMovement from "../../hooks/useEntityMovement";
import useGetDirection from "../../hooks/useGetDirection";
import useHandleDeadEntity from "../../hooks/useHandleDeadEntity";
import useHandleEntityState from "../../hooks/useHandleEntityState";
import useHandleHunger from "../../hooks/useHandleHunger";
import useHandleEatEntity from "../../hooks/useHandleEatEntity";

const Rabbit = ({
  id,
  position,
  entityAttributesRef,
  heightMap
}) => {
  const stateRef = useRef("explore");
  const meshRef = useRef();
  const targetEntityRef = useRef();
  const direction = useGetDirection(meshRef, targetEntityRef, stateRef);

  useHandleDeadEntity(
    id,
    meshRef, 
    entityAttributesRef.current.rabbit
  );

  useHandleEntityState(
    meshRef,
    rabbit.detectionRange,
    entityAttributesRef.current.wolf,
    entityAttributesRef.current.bush,
    targetEntityRef,
    stateRef
  )

  useEntityMovement(
    id,
    meshRef,
    direction,
    rabbit.speed,
    rabbit.speedOnWater,
    rabbit.size,
    heightMap,
    entityAttributesRef.current.rabbit,
  );

  useHandleHunger(
    id,
    entityAttributesRef.current.rabbit
  );

  useHandleEatEntity(
    id,
    rabbit.size,
    targetEntityRef,
    entityAttributesRef.current.rabbit,
    entityAttributesRef.current.bush
  )

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      visible={entityAttributesRef.current.rabbit[id].isAlive}
    >
      <icosahedronGeometry args={[rabbit.size]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};

export default Rabbit;