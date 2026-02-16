import { useRef } from "react";
import { bush } from "../../../constants/entity";
import useHandleDeadEntity from "../../hooks/useHandleDeadEntity";
import useHandleEntityPosition from "../../hooks/useHandleEntityPosition";

const Bush = ({ id, entityAttributesRef }) => {
  const meshRef = useRef();
  
  useHandleEntityPosition(
    id,
    meshRef,
    entityAttributesRef.current.bush
  );

  useHandleDeadEntity(
    id,
    meshRef,
    entityAttributesRef.current.bush
  );

  return (
    <mesh ref={meshRef} position={entityAttributesRef.current.bush[id].position}>
      <icosahedronGeometry args={[bush.size]} />
      <meshStandardMaterial 
        color={"#06b300"}
        opacity={0.8} 
        transparent 
      />
    </mesh>
  );
};

export default Bush;