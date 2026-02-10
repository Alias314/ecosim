import { useRef } from "react";
import { rabbit } from "../../../constants/entity";
import useEntityMovement from "../../hooks/useEntityMovement";
import useGetDirection from "../../hooks/useGetDirection";
import useHandleDeadEntity from "../../hooks/useHandleDeadEntity";
import useHandleEntityState from "../../hooks/useHandleEntityState";

const Rabbit = ({
  id,
  position,
  rabbitsAttributeRef,
  wolvesAttributeRef,
  heightMap
}) => {
  const stateRef = useRef("explore");
  const meshRef = useRef();
  const direction = useGetDirection(meshRef, wolvesAttributeRef, stateRef);

  useHandleDeadEntity(
    id,
    meshRef, 
    rabbitsAttributeRef
  );

  useHandleEntityState(
    meshRef,
    rabbit.type,
    rabbit.detectionRange,
    wolvesAttributeRef,
    stateRef
  )

  useEntityMovement(
    id,
    meshRef,
    direction,
    rabbit.speed,
    heightMap,
    rabbitsAttributeRef,
  );

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      visible={rabbitsAttributeRef.current[id].isAlive}
    >
      <icosahedronGeometry args={[rabbit.size, 2]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};

export default Rabbit;